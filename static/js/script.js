const projects = [
  {name:'Monitoramento de câmeras com Zabbix', category:'Python', description:'Scripts Python para automatizar cadastro e auditoria de hosts, com monitoramento de disponibilidade e alertas via Telegram.', stack:['Python','Zabbix','Automação','Telegram'], icon:'activity', status:'Python · Zabbix', image:'https://raw.githubusercontent.com/Renanlcds10/camera-monitoring-zabbix/main/docs/images/problems.png', alt:'Captura do painel de problemas do Zabbix no repositório do projeto', url:'https://github.com/Renanlcds10/camera-monitoring-zabbix'},
  {name:'Automação de turmas', category:'Automação', description:'Ferramentas em Excel e VBA para organizar solicitações de amizade, validar registros e apoiar a formação de turmas. A demonstração usa dados fictícios.', stack:['Excel','VBA','Automação'], icon:'workflow', status:'Excel · VBA', image:'/static/images/project-excel.svg', alt:'Ilustração de uma planilha com colunas e linhas, representando o projeto Excel e VBA', url:'https://github.com/Renanlcds10/excel-automacao-turmas'},
  {name:'Sistema de armazém', category:'Java', description:'Projeto introdutório de controle de estoque: cadastro, busca, atualização, listagem e ordenação de produtos com conceitos de orientação a objetos.', stack:['Java','OOP','ArrayList'], icon:'package', status:'Java · estudo', image:'/static/images/project-java.svg', alt:'Ilustração de uma interface de terminal com lista de produtos, representando o sistema de armazém', url:'https://github.com/Renanlcds10/SistemaArmazem', linkLabel:'Ver no GitHub', external:true},
  {name:'RecantoTI', category:'Suporte', description:'Painel interno de Infra & Suporte que reúne inventário, tarefas da equipe e manutenção preventiva. A apresentação usa apenas dados fictícios.', stack:['React','Node.js / Express','PostgreSQL','Prisma'], icon:'monitor-cog', status:'Demo · dados fictícios', image:'/static/images/project-recantoti.svg', alt:'Ilustração demonstrativa do RecantoTI com inventário, tarefas e manutenção preventiva fictícios', url:'/demo/recantoti', linkLabel:'Abrir demonstração', external:false}
];

const grid = document.querySelector('#project-grid');
function renderProjects(filter='Todos') {
  grid.innerHTML = projects.filter(project => filter === 'Todos' || project.category === filter || project.stack.includes(filter)).map(project => `
    <article class="project-card reveal visible"><div class="project-cover"><img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async"><span class="project-status">${project.status}</span></div><div class="project-card-top"><span class="project-symbol"><i data-lucide="${project.icon}"></i></span><span class="project-link-hint">${project.linkLabel || 'Ver no GitHub'} <i data-lucide="arrow-up-right"></i></span></div><h3>${project.name}</h3><p>${project.description}</p><div class="project-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div><a href="${project.url}" ${project.external ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${project.linkLabel || 'Abrir ' + project.name + ' no GitHub'}"></a></article>`).join('');
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
