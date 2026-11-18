# Portfólio Renan Luiz

Portfólio responsivo em Flask, HTML, CSS e JavaScript. Os projetos, links e dados de contato ficam reunidos em `static/js/script.js` e `templates/index.html` para atualização simples.

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

## Publicar no Render

O GitHub Pages publica arquivos estáticos e não executa Python/Flask. Use o GitHub para guardar o código e o Render como servidor da aplicação. O arquivo `render.yaml` já define um serviço Python com `pip install -r requirements.txt`, Gunicorn e verificação de saúde.

1. Crie um repositório no GitHub (por exemplo, `portfolio-renan`). Ele pode ser privado; o site hospedado será público. Não marque as opções para criar README, `.gitignore` ou licença, pois já existem no projeto.
2. No terminal, dentro desta pasta, conecte o repositório e envie a branch atual:

   ```powershell
   git remote add origin https://github.com/SEU_USUARIO/portfolio-renan.git
   git push -u origin master
   ```

3. No Render, escolha **New → Blueprint**, conecte o GitHub, selecione esse repositório e aplique o Blueprint. O Render detecta `render.yaml`, cria o serviço e fornece uma URL `onrender.com`.

O Blueprint usa o plano gratuito, adequado para publicar e experimentar. Nesse plano, o serviço suspende depois de 15 minutos sem acessos; a primeira abertura da demonstração pode levar até 50 segundos. O contato principal abre diretamente o WhatsApp e não depende do servidor para enviar mensagens. Consulte os [limites atuais do Render Free](https://render.com/docs/free).

## Personalizar

- Imagem do cenário: `static/images/hero-reference.webp`, recortada da imagem de referência para manter apenas a estação de trabalho e evitar repetir o texto que aparece na arte original.
- Foto: `static/images/renan-luiz.webp`.
- Currículos em PDF para download: `static/files/Curriculo_Renan_Luiz_Geral.pdf` e `static/files/Renan_Luiz_Resume_International.pdf`. Os DOCX originais permanecem no projeto como fontes editáveis.
- Projetos e filtros: lista `projects` em `static/js/script.js`. RecantoTI e Zabbix aparecem primeiro; a prévia otimizada do Zabbix fica hospedada em `static/images/project-zabbix-preview.jpg`.
- Ícones: Lucide 0.469.0 é servido localmente por `static/js/lucide-0.469.0.min.js`, sem dependência de unpkg.com. A licença está em `static/js/LUCIDE-LICENSE.txt`.
- RecantoTI: a rota `/demo/recantoti` é uma apresentação visual do sistema interno de Infra & Suporte, centrada em inventário, tarefas da equipe, manutenção preventiva, descartes e indicadores. Os registros, nomes, áreas, identificadores e métricas são fictícios; os filtros funcionam apenas na página e nenhuma ação salva ou envia dados. A stack informada para o projeto é React, Node.js/Express, PostgreSQL e Prisma.
- Links sociais e conteúdo: atualize os endereços correspondentes em `templates/index.html`.
- Para trocar a foto ou currículos, substitua os arquivos em `static/images/` e `static/files/` e mantenha os nomes referenciados no HTML.

As descrições dos projetos resumem o conteúdo público de cada repositório e podem ser editadas na lista `projects`.
