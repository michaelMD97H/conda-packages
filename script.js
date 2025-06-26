document.getElementById('surgeryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const table = document.querySelector('#agendaTable tbody');
  const row = document.createElement('tr');

  for (const value of formData.values()) {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  }

  table.appendChild(row);
  e.target.reset();
});
