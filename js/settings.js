const form = document.getElementById('schedule-form');
const container = document.getElementById('periods-container');

function loadSchedule() {
  const schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
  container.innerHTML = '';
  schedule.forEach((p, i) => {
    container.innerHTML += `
      <div class="period-edit">
        <input type="text" value="${p.name}" placeholder="Period Name" data-index="${i}" data-field="name" />
        <input type="time" value="${p.start}" data-index="${i}" data-field="start" />
        <input type="time" value="${p.end}" data-index="${i}" data-field="end" />
      </div>`;
  });
}

function addPeriod() {
  const schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
  schedule.push({ name: '', start: '', end: '' });
  localStorage.setItem('schedule', JSON.stringify(schedule));
  loadSchedule();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputs = container.querySelectorAll('input');
  const schedule = [];
  for (let i = 0; i < inputs.length; i += 3) {
    schedule.push({
      name: inputs[i].value,
      start: inputs[i + 1].value,
      end: inputs[i + 2].value
    });
  }
  localStorage.setItem('schedule', JSON.stringify(schedule));
  alert('✅ Schedule saved!');
});

loadSchedule();
