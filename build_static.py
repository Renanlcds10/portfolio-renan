"""Export the Flask-rendered portfolio as static files for GitHub Pages."""
from __future__ import annotations

import os
import shutil
from pathlib import Path

from app import app


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "site"
BASE_PATH = os.getenv("GITHUB_PAGES_BASE_PATH", "/portfolio-renan").rstrip("/")
SITE_URL = os.getenv(
    "PUBLIC_SITE_URL", "https://renanlcds10.github.io/portfolio-renan"
).rstrip("/")


def main() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)

    with app.test_client() as client:
        pages = {
            "index.html": client.get("/").get_data(as_text=True),
            "demo/recantoti/index.html": client.get("/demo/recantoti").get_data(
                as_text=True
            ),
        }

    for relative_path, html in pages.items():
        destination = OUTPUT / relative_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        html = html.replace('data-base-path=""', f'data-base-path="{BASE_PATH}"')
        html = html.replace('href="/#projetos"', f'href="{BASE_PATH}/#projetos"')
        html = html.replace('="/static/', f'="{BASE_PATH}/static/')
        html = html.replace(
            "https://portfolio-renan.onrender.com", SITE_URL
        )
        destination.write_text(html, encoding="utf-8")

    shutil.copytree(ROOT / "static", OUTPUT / "static")
    for asset in (OUTPUT / "static").rglob("*"):
        if asset.suffix.lower() == ".css":
            content = asset.read_text(encoding="utf-8")
            content = content.replace("/static/", f"{BASE_PATH}/static/")
            asset.write_text(content, encoding="utf-8")

    (OUTPUT / ".nojekyll").write_text("", encoding="utf-8")
    (OUTPUT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml\n",
        encoding="utf-8",
    )
    urls = (SITE_URL + "/", SITE_URL + "/demo/recantoti/")
    entries = "\n".join(f"  <url><loc>{url}</loc></url>" for url in urls)
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n</urlset>\n"
    )
    (OUTPUT / "sitemap.xml").write_text(sitemap, encoding="utf-8")


if __name__ == "__main__":
    main()
