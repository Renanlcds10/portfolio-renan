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

## Publicar

Publique em um serviço compatível com Python/WSGI (por exemplo, Render, Railway ou Fly.io), conecte o repositório, instale `requirements.txt` e defina o comando de inicialização como `gunicorn app:app`. Configure as variáveis SMTP no painel da hospedagem e use HTTPS. O site também pode ser adaptado para outras plataformas Python que aceitem Flask.

## Personalizar

- Imagem do cenário: `static/images/hero-reference.webp`, recortada da imagem de referência para manter apenas a estação de trabalho e evitar repetir o texto que aparece na arte original.
- Foto: `static/images/renan-luiz.webp`.
- Currículos para download: `static/files/Curriculo_Renan_Luiz_Geral.docx` e `static/files/Renan_Luiz_Resume_International.docx`.
- Projetos e filtros: lista `projects` em `static/js/script.js`. Os itens atuais apontam para os repositórios públicos de monitoramento de câmeras com Zabbix/Python, automação de turmas com Excel/VBA e sistema de armazém em Java. As prévias em SVG são ilustrações; a captura do Zabbix vem do próprio repositório.
- Links sociais e conteúdo: atualize os endereços correspondentes em `templates/index.html`.
- Para trocar a foto ou currículos, substitua os arquivos em `static/images/` e `static/files/` e mantenha os nomes referenciados no HTML.

As descrições dos projetos resumem o conteúdo público de cada repositório e podem ser editadas na lista `projects`.
