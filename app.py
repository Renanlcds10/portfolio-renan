"""Flask application for Renan Luiz's portfolio."""
from __future__ import annotations

import os
from flask import Flask, Response, render_template
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024
PUBLIC_SITE_URL = os.getenv("PUBLIC_SITE_URL", "https://portfolio-renan.onrender.com").rstrip("/")


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


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG") == "1")
