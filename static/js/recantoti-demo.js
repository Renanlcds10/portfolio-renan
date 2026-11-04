const demoRows = [...document.querySelectorAll('#ticket-list tr')];
const filterButtons = [...document.querySelectorAll('.ticket-filter')];
const searchInput = document.querySelector('#ticket-search');
const ticketCount = document.querySelector('#ticket-count');
const emptyTickets = document.querySelector('#empty-tickets');
let activeStatus = 'todos';

function updateTickets() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  let visible = 0;
  demoRows.forEach(row => {
    const matchesStatus = activeStatus === 'todos' || row.dataset.status === activeStatus;
    const matchesQuery = !query || row.dataset.search.toLocaleLowerCase('pt-BR').includes(query);
    const show = matchesStatus && matchesQuery;
    row.hidden = !show;
    if (show) visible++;
  });
  emptyTickets.hidden = visible !== 0;
  ticketCount.textContent = `Exibindo ${visible} ${visible === 1 ? 'registro fictício' : 'registros fictícios'}`;
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeStatus = button.dataset.statusFilter;
  filterButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  updateTickets();
}));
searchInput.addEventListener('input', updateTickets);

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
