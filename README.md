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

## Configurar envio do formulário

O formulário só confirma o envio quando o e-mail for realmente aceito pelo servidor SMTP. Configure estas variáveis no ambiente de execução:

Para desenvolvimento local, copie `.env.example` para `.env` e preencha os valores. O Flask carrega esse arquivo ao iniciar, e o Git ignora `.env` para manter credenciais fora do repositório. Em produção, cadastre as mesmas variáveis no painel de secrets/variáveis do serviço de hospedagem.

```text
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_USERNAME=...
SMTP_PASSWORD=...
SMTP_FROM=portfolio@seudominio.com
CONTACT_TO=seuemail@exemplo.com
```

Para o Yahoo, use `smtp.mail.yahoo.com`, porta `587` com STARTTLS, autenticação obrigatória, o endereço Yahoo completo em `SMTP_USERNAME` e uma senha de aplicativo em `SMTP_PASSWORD`. Crie essa senha na página de segurança da conta Yahoo; não use sua senha principal. Em `SMTP_FROM`, use o endereço Yahoo autorizado; `CONTACT_TO` é o endereço que receberá as mensagens. Sem as credenciais e `CONTACT_TO`, a API informa que o envio não está configurado; ela nunca simula sucesso. Veja as [configurações SMTP do Yahoo](https://help.yahoo.com/kb/SLN4075.html) e como [criar uma senha de aplicativo](https://help.yahoo.com/kb/SLN15241.html).

## Publicar no Render

O GitHub Pages publica arquivos estáticos e não executa Python/Flask. Use o GitHub para guardar o código e o Render como servidor da aplicação. O arquivo `render.yaml` já define um serviço Python com `pip install -r requirements.txt`, Gunicorn e verificação de saúde.

1. Crie um repositório no GitHub (por exemplo, `portfolio-renan`). Ele pode ser privado; o site hospedado será público. Não marque as opções para criar README, `.gitignore` ou licença, pois já existem no projeto.
2. No terminal, dentro desta pasta, conecte o repositório e envie a branch atual:

   ```powershell
   git remote add origin https://github.com/SEU_USUARIO/portfolio-renan.git
   git push -u origin master
   ```

3. No Render, escolha **New → Blueprint**, conecte o GitHub, selecione esse repositório e aplique o Blueprint. O Render detecta `render.yaml`, cria o serviço e fornece uma URL `onrender.com`.

O Blueprint usa o plano gratuito, adequado para publicar e experimentar. Nesse plano, o serviço suspende depois de 15 minutos sem acessos e pode levar cerca de um minuto para despertar. Além disso, o Render Free bloqueia tráfego SMTP de saída nas portas 25, 465 e 587. Portanto, o formulário de e-mail ainda precisa de outra configuração quando formos retomar essa etapa (plano pago ou um serviço de e-mail por API HTTPS). Consulte os limites atuais do [Render Free](https://render.com/docs/free).

## Personalizar

- Imagem do cenário: `static/images/hero-reference.webp`, recortada da imagem de referência para manter apenas a estação de trabalho e evitar repetir o texto que aparece na arte original.
- Foto: `static/images/renan-luiz.webp`.
- Currículos para download: `static/files/Curriculo_Renan_Luiz_Geral.docx` e `static/files/Renan_Luiz_Resume_International.docx`.
- Projetos e filtros: lista `projects` em `static/js/script.js`. Os itens atuais apontam para os repositórios públicos de monitoramento de câmeras com Zabbix/Python, automação de turmas com Excel/VBA e sistema de armazém em Java. As prévias em SVG são ilustrações; a captura do Zabbix vem do próprio repositório.
- RecantoTI: a rota `/demo/recantoti` é uma apresentação visual do sistema interno de Infra & Suporte, centrada em inventário, tarefas da equipe, manutenção preventiva, descartes e indicadores. Os registros, nomes, áreas, identificadores e métricas são fictícios; os filtros funcionam apenas na página e nenhuma ação salva ou envia dados. A stack informada para o projeto é React, Node.js/Express, PostgreSQL e Prisma.
- Links sociais e conteúdo: atualize os endereços correspondentes em `templates/index.html`.
- Para trocar a foto ou currículos, substitua os arquivos em `static/images/` e `static/files/` e mantenha os nomes referenciados no HTML.

As descrições dos projetos resumem o conteúdo público de cada repositório e podem ser editadas na lista `projects`.
