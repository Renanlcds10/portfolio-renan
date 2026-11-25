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
  const isEnglish = document.documentElement.lang === 'en';
  menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? (isEnglish ? 'Close menu' : 'Fechar menu') : (isEnglish ? 'Open menu' : 'Abrir menu')); nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label',document.documentElement.lang === 'en' ? 'Open menu' : 'Abrir menu');}));

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
    'about-two': 'That led me to AI. I explore AI APIs and intelligent agents and want to apply these tools to real process automation, beyond simple scripts.',
    'about-three': 'My experience with IT support and monitoring tools such as Zabbix, Grafana, and Ubuntu gave me a practical understanding of how systems work and fail, which helps me build more reliable solutions.',
    'about-four': 'I study Computer Science at IBMR and aim to become an AI Engineer. I am looking for an internship in AI, data, or software development, preferably remote, where I can learn from a team and contribute through practical work.',
    'education-label': 'Education',
    'education-value': 'BSc in Computer Science · IBMR',
    'goal-label': 'Career goal',
    'goal-value': 'Become an AI Engineer',
    'next-label': 'Next step',
    'next-value': 'Exchange program in Portugal · Feb–Jul 2027',
    'nav-home': 'Home', 'nav-about': 'About', 'nav-projects': 'Projects', 'nav-skills': 'Skills', 'nav-experience': 'Experience', 'nav-contact': 'Contact',
    'talk-button': "Let's talk", 'hero-eyebrow': 'Technology, creativity, and purpose', 'projects-button': 'View my projects', 'github-button': 'My GitHub',
    'specialties-label': 'Specialties', 'specialty-ai-title': 'Artificial Intelligence', 'specialty-ai-copy': 'Exploring APIs, intelligent agents, and AI integration.',
    'specialty-automation-title': 'Automation', 'specialty-automation-copy': 'Scripts and task automation with Python and VBA.',
    'specialty-dev-title': 'Development', 'specialty-dev-copy': 'Web applications, APIs, and Python tools.',
    'specialty-support-title': 'IT Support & Infrastructure', 'specialty-support-copy': 'Technical support and systems monitoring.',
    'about-location': 'Rio de Janeiro, Brazil',
    'resume-pt': 'Resume (PT-BR)', 'resume-en': 'Resume (EN)',
    'projects-eyebrow': 'Public GitHub projects and demos', 'projects-title': 'Projects in <span>practice</span>', 'view-github': 'View GitHub',
    'filter-label': 'Filter projects', 'filter-all': 'All', 'filter-automation': 'Automation', 'filter-infra': 'Infrastructure',
    'project-1-status': 'Python · PyAutoGUI', 'project-1-title': 'Timekeeping automation',
    'project-1-problem': '<strong>Problem</strong> Repetitive steps to access an internal system and register justifications.',
    'project-details': 'What I did and the outcome', 'project-what': '<strong>What I did:</strong> Python and PyAutoGUI script to automate access, navigation, and justification entry.',
    'project-action-profile': 'View GitHub profile', 'project-action-code': 'View source on GitHub', 'project-action-demo': 'Open demo',
    'project-2-title': 'Class grouping and sociogram', 'project-2-problem': '<strong>Problem</strong> Organizing data and supporting the analysis and distribution of students.',
    'project-2-what': '<strong>What I did:</strong> Excel/VBA macros to organize data, automate analysis, and support class formation.',
    'project-3-title': 'Camera monitoring with Zabbix', 'project-3-problem': '<strong>Problem</strong> Monitoring host availability and identifying connectivity failures.',
    'project-3-what': '<strong>What I did:</strong> Python scripts to register and audit monitored hosts, check availability, and send Telegram alerts.',
    'project-4-status': 'Demo · fictional data', 'project-4-title': 'RecantoTI',
    'project-4-problem': '<strong>Problem</strong> IT routines spread across inventory, requests, tasks, and maintenance.',
    'project-4-what': '<strong>What I did:</strong> Developed a web platform with a dashboard, inventory, requests, tasks, maintenance, and reports. The structure includes APIs, PostgreSQL, Prisma, JWT authentication, and role-based permissions.',
    'project-4-result': '<strong>Outcome:</strong> Centralized routines and displayed information in one environment, with spreadsheet integration support.',
    'project-5-status': 'Java · learning project', 'project-5-title': 'Warehouse inventory system',
    'project-5-problem': '<strong>Problem</strong> Managing product registration and stock lookup.',
    'project-5-what': '<strong>What I did:</strong> Introductory Java project with product registration, search, updates, listing, and sorting using object-oriented programming.',
    'project-5-result': '<strong>Outcome:</strong> Basic inventory management operations implemented in the project.',
    'project-empty': 'No public AI projects listed yet.',
    'skills-eyebrow': 'Everyday tools', 'skills-title': 'Skills and <span>technologies</span>',
    'skills-lead': 'Growing knowledge, with hands-on programming and support experience and ongoing exploration of AI.',
    'skill-programming': 'Programming', 'skill-tools': 'Tools & productivity', 'skill-support': 'IT support & infrastructure',
    'skill-ai': 'AI & intelligent automation', 'skill-ai-context': 'Practice and exploration', 'skill-cloud': 'Cloud',
    'journey-eyebrow': 'My journey', 'journey-title': 'Experience <span class="heading-conjunction">and</span> <span>education</span>',
    'journey-lead': 'My education, IT experience, and planned academic mobility.',
    'education-meta': 'Academic education', 'degree-title': 'BSc in Computer Science', 'degree-place': 'IBMR University Center · Rio de Janeiro', 'degree-copy': 'Degree in progress.',
    'experience-meta': 'Professional experience', 'role-title': 'IT Support Technician', 'role-place': 'Colégio Recanto · Rio de Janeiro',
    'highlight-automation': 'Automation', 'highlight-automation-copy': 'Building automations with Python, PyAutoGUI, Excel, and VBA to support internal processes and reduce manual tasks.',
    'highlight-monitoring': 'Monitoring', 'highlight-monitoring-copy': 'Monitoring infrastructure with Zabbix and Grafana, including Ubuntu workstations and dashboard organization.',
    'highlight-service': 'Technical support', 'highlight-service-copy': 'Supporting users and teachers; diagnosing and resolving issues with computers, printers, projectors, peripherals, systems, and networks.',
    'highlight-equipment': 'Equipment & inventory', 'highlight-equipment-copy': 'Installing and configuring Windows software and equipment, supporting preventive maintenance and IT inventory.',
    'upcoming-meta': 'Upcoming academic step', 'upcoming-date': 'Future · planned for 2027', 'upcoming-title': 'International mobility in Computer Engineering',
    'upcoming-place': 'Polytechnic Institute of Viseu · School of Technology and Management · Portugal',
    'upcoming-copy': 'Exchange program approved and planned for February to July 2027. The mobility period has not started yet.',
    'education-period': 'Aug 2024 – expected Aug 2028', 'experience-period': 'Apprentice · Jul 2025 – Dec 2026',
    'courses-eyebrow': 'Continuous learning', 'courses-title': 'Courses & additional education', 'courses-completed': 'Completed',
    'contact-eyebrow': 'Contact', 'contact-title': 'Have an opportunity in mind? <span>Get in touch.</span>',
    'contact-copy': 'You can reach me by email, LinkedIn, or WhatsApp.', 'contact-direct-title': 'Prefer a direct conversation?',
    'contact-direct-copy': 'Message me on WhatsApp to write and send your message there.', 'contact-whatsapp': 'Let’s chat on WhatsApp',
    'footer-copy': 'Projects and professional journey.', 'back-top': 'Back to top ↑',
    'aria-skip': 'Skip to content', 'aria-home': 'Renan Luiz, home', 'aria-home-footer': 'Renan Luiz, back to home',
    'aria-main-nav': 'Main navigation', 'aria-download-resume': 'Download resumes', 'aria-courses': 'Courses and additional education',
    'aria-support-activities': 'IT support activities', 'aria-project-preview-1': 'Illustration of a Python script running in a terminal',
    'aria-project-preview-2': 'Illustration of a spreadsheet for organizing and analyzing classes',
    'aria-project-preview-3': 'Zabbix alert dashboard for camera monitoring',
    'aria-project-preview-4': 'Visual demo of RecantoTI with fictional data',
    'aria-project-preview-5': 'Terminal illustration of a Java warehouse system',
    'aria-about-portrait': 'Portrait of Renan Luiz with red neon lighting and ring',
    'skill-support-windows': 'Windows', 'skill-support-linux': 'Linux', 'skill-support-helpdesk': 'Technical support',
    'skill-support-monitoring': 'Monitoring', 'skill-support-maintenance': 'Equipment maintenance', 'skill-support-inventory': 'IT inventory',
    'skill-ai-api': 'AI API integration', 'skill-ai-agents': 'Intelligent agents', 'skill-ai-dev': 'Using AI in development',
    'skill-cloud-render': 'Render · portfolio and demo', 'tag-automation': 'Automation', 'tag-oop': 'Object-oriented programming',
    'course-git': 'Git and GitHub', 'course-ai': 'Artificial Intelligence', 'course-apis': 'AI APIs', 'course-logic': 'Programming Logic and Algorithms'
  }
};
const languageToggle = document.querySelector('#language-toggle');
if (languageToggle) {
  let currentLanguage = 'pt';
  const translatableElements = [...document.querySelectorAll('[data-i18n]')];
  const portugueseCopy = new Map(translatableElements.map(element => [element.dataset.i18n, element.innerHTML]));
  const pageCopy = new Map();
  const pageTranslations = {
    'a.skip-link': 'aria-skip',
    '.nav-link:nth-child(1)': 'nav-home', '.nav-link:nth-child(2)': 'nav-about', '.nav-link:nth-child(3)': 'nav-projects',
    '.nav-link:nth-child(4)': 'nav-skills', '.nav-link:nth-child(5)': 'nav-experience', '.nav-link:nth-child(6)': 'nav-contact',
    '.header-actions .button-small': 'talk-button', '.hero .eyebrow': 'hero-eyebrow',
    '.specialty-card:nth-child(1) h3': 'specialty-ai-title', '.specialty-card:nth-child(1) p': 'specialty-ai-copy',
    '.specialty-card:nth-child(2) h3': 'specialty-automation-title', '.specialty-card:nth-child(2) p': 'specialty-automation-copy',
    '.specialty-card:nth-child(3) h3': 'specialty-dev-title', '.specialty-card:nth-child(3) p': 'specialty-dev-copy',
    '.specialty-card:nth-child(4) h3': 'specialty-support-title', '.specialty-card:nth-child(4) p': 'specialty-support-copy',
    '.about-caption': 'about-location', '.resume-links a:nth-child(1)': 'resume-pt', '.resume-links a:nth-child(2)': 'resume-en',
    '#projetos .eyebrow': 'projects-eyebrow', '#projetos h2': 'projects-title', '#projetos .text-link': 'view-github',
    '.project-card:nth-child(1) .project-status': 'project-1-status', '.project-card:nth-child(1) h3': 'project-1-title',
    '.project-card:nth-child(1) .project-problem': 'project-1-problem', '.project-card:nth-child(1) summary': 'project-details',
    '.project-card:nth-child(1) details p': 'project-what', '.project-card:nth-child(1) .project-action': 'project-action-profile',
    '.project-card:nth-child(2) h3': 'project-2-title', '.project-card:nth-child(2) .project-problem': 'project-2-problem',
    '.project-card:nth-child(2) summary': 'project-details', '.project-card:nth-child(2) details p': 'project-2-what', '.project-card:nth-child(2) .project-action': 'project-action-code',
    '.project-card:nth-child(3) h3': 'project-3-title', '.project-card:nth-child(3) .project-problem': 'project-3-problem',
    '.project-card:nth-child(3) summary': 'project-details', '.project-card:nth-child(3) details p': 'project-3-what', '.project-card:nth-child(3) .project-action': 'project-action-code',
    '.project-card:nth-child(4) .project-status': 'project-4-status', '.project-card:nth-child(4) h3': 'project-4-title',
    '.project-card:nth-child(4) .project-problem': 'project-4-problem', '.project-card:nth-child(4) summary': 'project-details',
    '.project-card:nth-child(4) details p:nth-of-type(1)': 'project-4-what', '.project-card:nth-child(4) details p:nth-of-type(2)': 'project-4-result', '.project-card:nth-child(4) .project-action': 'project-action-demo',
    '.project-card:nth-child(5) .project-status': 'project-5-status', '.project-card:nth-child(5) h3': 'project-5-title',
    '.project-card:nth-child(5) .project-problem': 'project-5-problem', '.project-card:nth-child(5) summary': 'project-details',
    '.project-card:nth-child(5) details p:nth-of-type(1)': 'project-5-what', '.project-card:nth-child(5) details p:nth-of-type(2)': 'project-5-result', '.project-card:nth-child(5) .project-action': 'project-action-code',
    '.project-card:nth-child(1) .project-tags span:nth-child(3)': 'tag-automation', '.project-card:nth-child(2) .project-tags span:nth-child(3)': 'tag-automation',
    '.project-card:nth-child(5) .project-tags span:nth-child(2)': 'tag-oop',
    '#project-empty': 'project-empty', '#habilidades .eyebrow': 'skills-eyebrow', '#habilidades h2': 'skills-title', '#habilidades .section-lead': 'skills-lead',
    '.skill-panel:nth-child(1) h3': 'skill-programming', '.skill-panel:nth-child(2) h3': 'skill-tools', '.skill-panel:nth-child(3) h3': 'skill-support',
    '.skill-panel:nth-child(4) h3': 'skill-ai', '.skill-panel:nth-child(4) .skill-context': 'skill-ai-context', '.skill-panel:nth-child(5) h3': 'skill-cloud',
    '.skill-panel:nth-child(3) .skill-tags span:nth-child(1)': 'skill-support-windows', '.skill-panel:nth-child(3) .skill-tags span:nth-child(2)': 'skill-support-linux',
    '.skill-panel:nth-child(3) .skill-tags span:nth-child(3)': 'skill-support-helpdesk', '.skill-panel:nth-child(3) .skill-tags span:nth-child(4)': 'skill-support-monitoring',
    '.skill-panel:nth-child(3) .skill-tags span:nth-child(5)': 'skill-support-maintenance', '.skill-panel:nth-child(3) .skill-tags span:nth-child(6)': 'skill-support-inventory',
    '.skill-panel:nth-child(4) .skill-tags span:nth-child(1)': 'skill-ai-api', '.skill-panel:nth-child(4) .skill-tags span:nth-child(2)': 'skill-ai-agents',
    '.skill-panel:nth-child(4) .skill-tags span:nth-child(3)': 'skill-ai-dev', '.skill-panel:nth-child(5) .skill-tags span:nth-child(2)': 'skill-cloud-render',
    '.course-tags span:nth-child(1)': 'course-git', '.course-tags span:nth-child(2)': 'course-ai', '.course-tags span:nth-child(3)': 'course-apis', '.course-tags span:nth-child(4)': 'course-logic',
    '#experiencia .eyebrow': 'journey-eyebrow', '#experiencia h2': 'journey-title', '#experiencia .section-lead': 'journey-lead',
    '.timeline-item:nth-child(1) .timeline-meta span:first-child': 'education-meta', '.timeline-item:nth-child(1) .timeline-meta span:last-child': 'education-period', '.timeline-item:nth-child(1) h3': 'degree-title', '.timeline-item:nth-child(1) .timeline-place': 'degree-place', '.timeline-item:nth-child(1) > p:last-child': 'degree-copy',
    '.timeline-item:nth-child(2) .timeline-meta span:first-child': 'experience-meta', '.timeline-item:nth-child(2) .timeline-meta span:last-child': 'experience-period', '.timeline-item:nth-child(2) h3': 'role-title', '.timeline-item:nth-child(2) .timeline-place': 'role-place',
    '.timeline-highlight:nth-child(1) h4': 'highlight-automation', '.timeline-highlight:nth-child(1) p': 'highlight-automation-copy',
    '.timeline-highlight:nth-child(2) h4': 'highlight-monitoring', '.timeline-highlight:nth-child(2) p': 'highlight-monitoring-copy',
    '.timeline-highlight:nth-child(3) h4': 'highlight-service', '.timeline-highlight:nth-child(3) p': 'highlight-service-copy',
    '.timeline-highlight:nth-child(4) h4': 'highlight-equipment', '.timeline-highlight:nth-child(4) p': 'highlight-equipment-copy',
    '.timeline-item:nth-child(3) .timeline-meta span:first-child': 'upcoming-meta', '.timeline-item:nth-child(3) .timeline-meta span:last-child': 'upcoming-date',
    '.timeline-item:nth-child(3) h3': 'upcoming-title', '.timeline-item:nth-child(3) .timeline-place': 'upcoming-place', '.timeline-item:nth-child(3) > p:last-child': 'upcoming-copy',
    '.courses-panel .courses-heading .eyebrow': 'courses-eyebrow', '#courses-title': 'courses-title', '.course-group:nth-of-type(2) h4': 'courses-completed',
    '.contact-copy .eyebrow': 'contact-eyebrow', '#contact-title': 'contact-title', '.contact-copy > p:not(.eyebrow)': 'contact-copy',
    '.contact-message-card h3': 'contact-direct-title', '.contact-message-card > p': 'contact-direct-copy', '.contact-message-card .button': 'contact-whatsapp',
    '.footer-inner > p': 'footer-copy', '.back-top': 'back-top'
  };
  const attributeTranslations = {
    '.main-nav': { 'aria-label': 'aria-main-nav' }, '.specialties': { 'aria-label': 'specialties-label' },
    '.filter-bar': { 'aria-label': 'filter-label' }, '.resume-links': { 'aria-label': 'aria-download-resume' },
    '.timeline-highlights': { 'aria-label': 'aria-support-activities' }, '.header-inner > .brand': { 'aria-label': 'aria-home' }, '.footer-inner .brand': { 'aria-label': 'aria-home-footer' },
    '.about-portrait': { alt: 'aria-about-portrait' },
    '.project-card:nth-child(1) .project-cover img': { alt: 'aria-project-preview-1' }, '.project-card:nth-child(2) .project-cover img': { alt: 'aria-project-preview-2' },
    '.project-card:nth-child(3) .project-cover img': { alt: 'aria-project-preview-3' }, '.project-card:nth-child(4) .project-cover img': { alt: 'aria-project-preview-4' },
    '.project-card:nth-child(5) .project-cover img': { alt: 'aria-project-preview-5' }
  };
  const directText = element => [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  const pageTextCopy = new Map();
  for (const selector of Object.keys(pageTranslations)) {
    document.querySelectorAll(selector).forEach((element, index) => {
      pageCopy.set(`${selector}::${index}`, element.innerHTML);
      pageTextCopy.set(`${selector}::${index}`, directText(element).map(node => node.textContent).join(''));
    });
  }
  for (const selector of Object.keys(attributeTranslations)) {
    document.querySelectorAll(selector).forEach((element, index) => {
      for (const attribute of Object.keys(attributeTranslations[selector])) pageCopy.set(`${selector}::${index}::${attribute}`, element.getAttribute(attribute) || '');
    });
  }
  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'pt-BR';
    translatableElements.forEach(element => {
      const key = element.dataset.i18n;
      const translation = currentLanguage === 'en' ? translations.en[key] : portugueseCopy.get(key);
      if (translation) element.innerHTML = translation;
    });
    for (const [selector, key] of Object.entries(pageTranslations)) {
      document.querySelectorAll(selector).forEach((element, index) => {
        const original = pageCopy.get(`${selector}::${index}`) || '';
        const translation = currentLanguage === 'en' ? translations.en[key] : original;
        if (!translation) return;
        if (['a.skip-link', '.nav-link', '.header-actions .button-small', '.about-caption', '.resume-links a:nth-child(1)', '.resume-links a:nth-child(2)', '#projetos .text-link', '.project-card .project-action', '.contact-message-card .button', '.footer-inner > p'].some(item => selector === item || (item === '.nav-link' && selector.startsWith('.nav-link:nth-child')) || (item === '.project-card .project-action' && selector.includes('.project-action'))) || selector.startsWith('.course-tags')) {
          const nodes = directText(element);
          if (nodes.length) nodes[nodes.length - 1].textContent = currentLanguage === 'en' ? ` ${translation} ` : pageTextCopy.get(`${selector}::${index}`) || '';
        } else {
          element.innerHTML = translation;
        }
      });
    }
    for (const [selector, attributes] of Object.entries(attributeTranslations)) {
      document.querySelectorAll(selector).forEach((element, index) => {
        for (const [attribute, key] of Object.entries(attributes)) {
          const original = pageCopy.get(`${selector}::${index}::${attribute}`) || '';
          element.setAttribute(attribute, currentLanguage === 'en' ? translations.en[key] : original);
        }
      });
    }
    document.querySelectorAll('.filter-button').forEach(button => {
      if (button.dataset.filter === 'IA' || button.dataset.filter === 'Python' || button.dataset.filter === 'Web' || button.dataset.filter === 'Java') button.textContent = button.dataset.filter;
      if (button.dataset.filter === 'Automação') button.textContent = currentLanguage === 'en' ? 'Automation' : 'Automação';
      if (button.dataset.filter === 'Infraestrutura') button.textContent = currentLanguage === 'en' ? 'Infrastructure' : 'Infraestrutura';
      if (button.dataset.filter === 'Todos') button.textContent = currentLanguage === 'en' ? 'All' : 'Todos';
    });
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) menuToggle.setAttribute('aria-label', menuToggle.getAttribute('aria-expanded') === 'true' ? (currentLanguage === 'en' ? 'Close menu' : 'Fechar menu') : (currentLanguage === 'en' ? 'Open menu' : 'Abrir menu'));
    languageToggle.textContent = currentLanguage === 'en' ? 'PT' : 'EN';
    languageToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Switch to Portuguese' : 'Switch to English');
  });
}
