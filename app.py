"""Flask application for Renan Luiz's portfolio."""
from __future__ import annotations

import os
import re
import smtplib
from email.message import EmailMessage
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024


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
    port = int(os.getenv("SMTP_PORT", "587"))
    with smtplib.SMTP(host, port, timeout=15) as server:
        server.starttls()
        username = os.getenv("SMTP_USERNAME")
        password = os.getenv("SMTP_PASSWORD")
        if username and password:
            server.login(username, password)
        server.send_message(mail)


@app.get("/")
def index():
    return render_template("index.html")


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
