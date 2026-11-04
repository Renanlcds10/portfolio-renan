const demoRows = [...document.querySelectorAll('#task-list tr')];
const filterButtons = [...document.querySelectorAll('.ticket-filter')];
const searchInput = document.querySelector('#task-search');
const taskCount = document.querySelector('#task-count');
const emptyTasks = document.querySelector('#empty-tasks');
let activeStatus = 'todas';

function updateTasks() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  let visible = 0;
  demoRows.forEach(row => {
    const matchesStatus = activeStatus === 'todas' || row.dataset.taskStatus === activeStatus;
    const matchesQuery = !query || row.dataset.search.toLocaleLowerCase('pt-BR').includes(query);
    const show = matchesStatus && matchesQuery;
    row.hidden = !show;
    if (show) visible++;
  });
  emptyTasks.hidden = visible !== 0;
  taskCount.textContent = `Exibindo ${visible} ${visible === 1 ? 'tarefa fictícia' : 'tarefas fictícias'}`;
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeStatus = button.dataset.taskFilter;
  filterButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  updateTasks();
}));
searchInput.addEventListener('input', updateTasks);

const toast = document.querySelector('#demo-toast');
let toastTimer;
document.querySelectorAll('[data-demo-action]').forEach(button => button.addEventListener('click', () => {
  toast.textContent = 'Demonstração visual: nenhuma solicitação é enviada ou informação é salva.';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}));

document.querySelectorAll('.demo-nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.demo-nav a.active')?.classList.remove('active');
  link.classList.add('active');
}));

if (window.lucide) lucide.createIcons();
