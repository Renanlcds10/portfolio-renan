const projects = [
  {name:'Monitoramento de câmeras com Zabbix', category:'Python', description:'Scripts Python para automatizar o cadastro e a auditoria de hosts no Zabbix, acompanhar disponibilidade e enviar alertas via Telegram.', caseStudy:'O projeto reúne rotinas de cadastro e auditoria de hosts monitorados, verificações de disponibilidade e notificações via Telegram. Consulte o repositório para ver os scripts e os requisitos de configuração.', stack:['Python','Zabbix','Automação','Telegram'], icon:'activity', status:'Python · Zabbix', image:'https://raw.githubusercontent.com/Renanlcds10/camera-monitoring-zabbix/main/docs/images/problems.png', alt:'Captura do painel de problemas do Zabbix no repositório do projeto', url:'https://github.com/Renanlcds10/camera-monitoring-zabbix', linkLabel:'Ver código no GitHub', external:true},
  {name:'Automação de turmas', category:'Automação', description:'Ferramentas em Excel e VBA para organizar solicitações, validar registros e apoiar a formação de turmas. Os dados da demonstração são fictícios.', caseStudy:'O fluxo usa planilhas e macros para organizar informações, verificar registros e dar suporte às etapas de formação de turmas. O material público apresenta apenas exemplos fictícios.', stack:['Excel','VBA','Automação'], icon:'workflow', status:'Excel · VBA', image:'/static/images/project-excel.svg', alt:'Ilustração de uma planilha com colunas e linhas, representando o projeto Excel e VBA', url:'https://github.com/Renanlcds10/excel-automacao-turmas', linkLabel:'Ver código no GitHub', external:true},
  {name:'Sistema de armazém', category:'Java', description:'Projeto introdutório de controle de estoque com cadastro, busca, atualização, listagem e ordenação de produtos usando orientação a objetos.', caseStudy:'O escopo implementado no projeto cobre operações básicas sobre produtos armazenados em uma coleção: cadastrar, localizar, atualizar, listar e ordenar. A estrutura usa conceitos introdutórios de orientação a objetos em Java.', stack:['Java','OOP','ArrayList'], icon:'package', status:'Java · estudo', image:'/static/images/project-java.svg', alt:'Ilustração de uma interface de terminal com lista de produtos, representando o sistema de armazém', url:'https://github.com/Renanlcds10/SistemaArmazem', linkLabel:'Ver código no GitHub', external:true},
  {name:'RecantoTI', category:'Suporte', description:'Sistema interno de Infra & Suporte para reunir inventário, tarefas da equipe, manutenção preventiva e histórico de descartes.', caseStudy:'O projeto organiza registros de materiais e equipamentos, atividades da equipe e acompanhamento preventivo. A demonstração pública é independente do sistema interno: seus nomes, locais e indicadores são fictícios, e nenhuma ação salva dados.', stack:['React','Node.js / Express','PostgreSQL','Prisma'], icon:'monitor-cog', status:'Demo · dados fictícios', image:'/static/images/project-recantoti.svg', alt:'Ilustração demonstrativa do RecantoTI com inventário, tarefas e manutenção preventiva fictícios', url:'/demo/recantoti', linkLabel:'Abrir demonstração', external:false}
];

const grid = document.querySelector('#project-grid');
function renderProjects(filter='Todos') {
  grid.innerHTML = projects.filter(project => filter === 'Todos' || project.category === filter || project.stack.includes(filter)).map(project => `
    <article class="project-card reveal visible"><div class="project-cover"><img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async"><span class="project-status">${project.status}</span></div><div class="project-card-top"><span class="project-symbol"><i data-lucide="${project.icon}"></i></span></div><h3>${project.name}</h3><p>${project.description}</p><div class="project-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div><details class="project-details"><summary>Ver detalhes do projeto</summary><p>${project.caseStudy}</p></details><a class="project-action" href="${project.url}" ${project.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${project.linkLabel} <i data-lucide="arrow-up-right"></i></a></article>`).join('');
  if (window.lucide) lucide.createIcons();
}
renderProjects();
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter-button.active')?.classList.remove('active'); button.classList.add('active'); renderProjects(button.dataset.filter);
}));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));
const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-35% 0px -55%'});
sections.forEach(section=>sectionObserver.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();
const form=document.querySelector('#contact-form');
form.addEventListener('submit',async event=>{
  event.preventDefault(); const status=document.querySelector('#form-status'); const submit=form.querySelector('button[type="submit"]');
  status.className='form-status'; status.textContent='Enviando…'; submit.disabled=true;
  try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const result=await response.json();status.textContent=result.message;status.classList.add(response.ok?'success':'error');if(response.ok)form.reset();}
  catch{status.textContent='Não foi possível conectar ao servidor. Tente novamente.';status.classList.add('error');}
  finally{submit.disabled=false;}
});
if(window.lucide)lucide.createIcons();
