# Portfólio Renan Luiz

Portfólio responsivo em Flask, HTML, CSS e JavaScript. O conteúdo dos projetos e os links ficam no HTML em `templates/index.html`, disponíveis mesmo sem JavaScript; `static/js/script.js` cuida dos filtros e das interações.

## Rodar localmente

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Acesse http://127.0.0.1:5000.

## Contato

Os botões **Vamos conversar** abrem o WhatsApp informado no HTML. A pessoa escreve e envia a mensagem no aplicativo. Não há formulário de e-mail nem credenciais de serviço de e-mail para configurar.

## Publicar no GitHub Pages

O site público fica em <https://renanlcds10.github.io/portfolio-renan/>. O GitHub Pages não executa Python; por isso, o fluxo em `.github/workflows/deploy-pages.yml` renderiza as páginas Flask para arquivos estáticos e publica também a demonstração do RecantoTI. Cada `push` na branch `master` dispara uma nova publicação.

Para ativar no repositório, deixe-o público e selecione **Settings → Pages → Build and deployment → Source → GitHub Actions**. O domínio de projeto usa o nome do repositório no caminho, então ele não precisa ser renomeado.

## Publicar no Render

O Render continua disponível para servir a aplicação Flask. O arquivo `render.yaml` define um serviço Python com `pip install -r requirements.txt`, Gunicorn e verificação de saúde. No Render, use **New → Blueprint**, conecte o GitHub, selecione o repositório e aplique o Blueprint. A URL `onrender.com` existente pode continuar sendo usada.

O Blueprint usa o plano gratuito; nesse plano, o serviço suspende após inatividade e a primeira abertura da demonstração pode levar até 50 segundos. O contato principal abre diretamente o WhatsApp e não depende do servidor para enviar mensagens. Consulte os [limites atuais do Render Free](https://render.com/docs/free).

## Personalizar

- Imagem do cenário: `static/images/hero-reference.webp`, recortada da imagem de referência para manter apenas a estação de trabalho e evitar repetir o texto que aparece na arte original.
- Foto: `static/images/renan-luiz.webp`.
- Currículos em PDF para download: `static/files/Curriculo_Renan_Luiz_Geral.pdf` e `static/files/Renan_Luiz_Resume_International.pdf`. Os DOCX originais permanecem no projeto como fontes editáveis.
- Projetos e filtros: cards diretamente em `templates/index.html`; as categorias para filtragem ficam em `data-categories` e o comportamento está em `static/js/script.js`. As prévias ficam em `static/images/`.
- Ícones: Lucide 0.469.0 é servido localmente por `static/js/lucide-0.469.0.min.js`, sem dependência de unpkg.com. A licença está em `static/js/LUCIDE-LICENSE.txt`.
- RecantoTI: a rota `/demo/recantoti` é uma apresentação visual do sistema interno de Infra & Suporte, centrada em inventário, tarefas da equipe, manutenção preventiva, descartes e indicadores. Os registros, nomes, áreas, identificadores e métricas são fictícios; os filtros funcionam apenas na página e nenhuma ação salva ou envia dados. A stack informada para o projeto é React, Node.js/Express, PostgreSQL e Prisma.
- Links sociais e conteúdo: atualize os endereços correspondentes em `templates/index.html`.
- Para trocar a foto ou currículos, substitua os arquivos em `static/images/` e `static/files/` e mantenha os nomes referenciados no HTML.

As descrições dos projetos resumem o conteúdo público de cada repositório e podem ser editadas na lista `projects`.
