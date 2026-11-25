const grid = document.querySelector('#project-grid');
if (grid) {
  const projectCards = [...grid.querySelectorAll('.project-card')];
  const emptyState = document.querySelector('#project-empty');
  const normalizeFilter = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const filter = normalizeFilter(button.dataset.filter);
    projectCards.forEach(card => {
      const categories = (card.dataset.categories || '').split(/\s+/);
      const visible = filter === 'todos' || categories.includes(filter);
      card.hidden = !visible;
      if (visible) card.classList.add('visible');
    });
    if (emptyState) emptyState.hidden = projectCards.some(card => !card.hidden);
  }));
}

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
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){document.querySelectorAll('.nav-link').forEach(link=>{
  const selected = link.getAttribute('href') === `#${entry.target.id}`;
  link.classList.toggle('active', selected);
  if (selected) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
});}}),{rootMargin:'-35% 0px -55%'});
sections.forEach(section=>sectionObserver.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();
if(window.lucide)lucide.createIcons();

const translations = {
  en: {
    availability: 'Open to opportunities',
    'scroll-cue': 'Explore the portfolio',
    'hero-title': 'Computer Science student focused on <em>Artificial Intelligence</em>',
    'hero-tech': 'Artificial Intelligence <b>·</b> Python <b>·</b> Automation <b>·</b> Web Development',
    'hero-description': 'Computer Science student focused on AI and automation. I build solutions with Python and AI APIs. Seeking an internship in AI, data, or software development.',
    'about-eyebrow': 'My background',
    'about-title': 'Building my path in <span>technology</span>',
    'about-one': 'I started in IT by solving everyday problems at a school: a printer that would not print, a projector that would not turn on, a slow network. I saw how much time repetitive tasks consumed and began automating them with Python, PyAutoGUI, Excel, and VBA.',
    'about-two': 'That led me to AI. I am studying AI APIs and intelligent agents, and want to apply them to real process automation beyond simple scripts. I am also taking AWS Securing Generative AI to learn how to put AI into production safely.',
    'about-three': 'My experience with IT support and monitoring tools such as Zabbix, Grafana, and Ubuntu gave me a practical understanding of how systems work and fail, which helps me build more reliable solutions.',
    'about-four': 'I study Computer Science at IBMR and aim to become an AI Engineer. I am looking for an internship in AI, data, or software development, preferably remote, where I can learn from a team and contribute through practical work.',
    'education-label': 'Education',
    'education-value': 'BSc in Computer Science · IBMR',
    'goal-label': 'Career goal',
    'goal-value': 'Become an AI Engineer',
    'next-label': 'Next step',
    'next-value': 'Exchange program in Portugal · Feb–Jul 2027'
  }
};
const languageToggle = document.querySelector('#language-toggle');
if (languageToggle) {
  let currentLanguage = 'pt';
  const translatableElements = [...document.querySelectorAll('[data-i18n]')];
  const portugueseCopy = new Map(translatableElements.map(element => [element.dataset.i18n, element.innerHTML]));
  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'pt-BR';
    translatableElements.forEach(element => {
      const key = element.dataset.i18n;
      const translation = currentLanguage === 'en' ? translations.en[key] : portugueseCopy.get(key);
      if (translation) element.innerHTML = translation;
    });
    languageToggle.textContent = currentLanguage === 'en' ? 'PT' : 'EN';
    languageToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Mudar para português' : 'Switch to English');
  });
}
