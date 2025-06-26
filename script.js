document.getElementById('surgeryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const table = document.querySelector('#agendaTable tbody');

  // Coletar valores do formulário
  const values = Array.from(formData.values());
  const row = document.createElement('tr');
  for (const value of values) {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  }

  // Adicionar a nova linha
  table.appendChild(row);

  // Ordenar por data
  const rows = Array.from(table.querySelectorAll('tr'));
  rows.sort((a, b) => {
    const dateA = new Date(a.children[4].textContent);
    const dateB = new Date(b.children[4].textContent);
    return dateA - dateB;
  });

  // Limpar e reordenar a tabela
  table.innerHTML = '';
  rows.forEach(r => table.appendChild(r));

  // Resetar o formulário
  e.target.reset();
});
