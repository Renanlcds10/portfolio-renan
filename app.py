"""Flask application for Renan Luiz's portfolio."""
from __future__ import annotations

import os
import re
import smtplib
import json
from email.message import EmailMessage
from flask import Flask, Response, jsonify, render_template, request
from dotenv import load_dotenv
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024
PUBLIC_SITE_URL = os.getenv("PUBLIC_SITE_URL", "https://portfolio-renan.onrender.com").rstrip("/")


def send_contact_message(name: str, email: str, subject: str, message: str) -> None:
    """Send through Resend's HTTPS API or configured SMTP, and fail explicitly otherwise."""
    recipient = os.getenv("CONTACT_TO")
    if not recipient:
        raise RuntimeError("O endereço que receberá as mensagens ainda não está configurado.")

    resend_key = os.getenv("RESEND_API_KEY")
    resend_from = os.getenv("RESEND_FROM")
    if resend_key or resend_from:
        if not resend_key or not resend_from:
            raise RuntimeError("Configure RESEND_API_KEY e RESEND_FROM juntos.")
        payload = {
            "from": resend_from,
            "to": [recipient],
            "reply_to": email,
            "subject": f"[Portfólio] {subject}",
            "text": f"Nome: {name}\nE-mail: {email}\n\n{message}",
        }
        api_request = Request(
            "https://api.resend.com/emails",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {resend_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urlopen(api_request, timeout=15) as response:
                if not 200 <= response.status < 300:
                    raise RuntimeError("O serviço de e-mail não confirmou o envio.")
        except HTTPError as exc:
            app.logger.warning("Resend rejected contact delivery with HTTP %s", exc.code)
            raise RuntimeError("Não foi possível enviar agora. Confira a configuração do serviço de e-mail.") from exc
        except URLError as exc:
            app.logger.warning("Resend contact delivery connection failed: %s", exc.reason)
            raise RuntimeError("Não foi possível conectar ao serviço de e-mail. Tente novamente mais tarde.") from exc
        return

    host = os.getenv("SMTP_HOST")
    if not host:
        raise RuntimeError("Configure Resend por HTTPS ou SMTP para ativar o envio de mensagens.")
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
