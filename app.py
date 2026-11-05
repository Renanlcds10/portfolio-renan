"""Flask application for Renan Luiz's portfolio."""
from __future__ import annotations

import os
import re
import smtplib
from email.message import EmailMessage
from flask import Flask, Response, jsonify, render_template, request
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024
PUBLIC_SITE_URL = os.getenv("PUBLIC_SITE_URL", "https://portfolio-renan.onrender.com").rstrip("/")


def send_contact_message(name: str, email: str, subject: str, message: str) -> None:
    """Send via SMTP when configured; fail explicitly when it is not."""
    host = os.getenv("SMTP_HOST")
    recipient = os.getenv("CONTACT_TO")
    if not host or not recipient:
        raise RuntimeError("O envio de mensagens ainda não está configurado.")
    mail = EmailMessage()
    mail["Subject"] = f"[Portfólio] {subject}"
    mail["From"] = os.getenv("SMTP_FROM", recipient)
    mail["To"] = recipient
    mail["Reply-To"] = email
    mail.set_content(f"Nome: {name}\nE-mail: {email}\n\n{message}")
    try:
        port = int(os.getenv("SMTP_PORT", "587"))
    except ValueError as exc:
        raise RuntimeError("A configuração SMTP_PORT precisa ser um número de porta válido.") from exc
    if not 1 <= port <= 65535:
        raise RuntimeError("A configuração SMTP_PORT precisa estar entre 1 e 65535.")
    username = os.getenv("SMTP_USERNAME")
    password = os.getenv("SMTP_PASSWORD")
    if bool(username) != bool(password):
        raise RuntimeError("Configure SMTP_USERNAME e SMTP_PASSWORD juntos.")
    if host.lower() == "smtp.mail.yahoo.com" and not (username and password):
        raise RuntimeError("O Yahoo exige o e-mail completo e uma senha de aplicativo para autenticação SMTP.")
    with smtplib.SMTP(host, port, timeout=15) as server:
        server.starttls()
        if username and password:
            server.login(username, password)
        server.send_message(mail)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/robots.txt")
def robots():
    content = f"User-agent: *\nAllow: /\nSitemap: {PUBLIC_SITE_URL}/sitemap.xml\n"
    return Response(content, mimetype="text/plain")


@app.get("/sitemap.xml")
def sitemap():
    urls = (f"{PUBLIC_SITE_URL}/", f"{PUBLIC_SITE_URL}/demo/recantoti")
    entries = "\n".join(f"  <url><loc>{url}</loc></url>" for url in urls)
    content = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{entries}\n</urlset>\n'
    return Response(content, mimetype="application/xml")


@app.get("/demo/recantoti")
def recantoti_demo():
    return render_template("recantoti_demo.html")


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or request.form
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    subject = str(data.get("subject", "")).strip()
    message = str(data.get("message", "")).strip()
    if not all((name, email, subject, message)):
        return jsonify(ok=False, message="Preencha todos os campos."), 400
    if len(name) > 100 or len(subject) > 150 or len(message) > 5000 or not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify(ok=False, message="Confira os dados e tente novamente."), 400
    try:
        send_contact_message(name, email, subject, message)
    except (OSError, RuntimeError, smtplib.SMTPException) as exc:
        app.logger.warning("Contact delivery failed: %s", exc)
        return jsonify(ok=False, message=str(exc) if isinstance(exc, RuntimeError) else "Não foi possível enviar agora. Tente novamente mais tarde."), 503
    return jsonify(ok=True, message="Mensagem enviada. Obrigado pelo contato!")


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG") == "1")
