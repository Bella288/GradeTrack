const container = document.getElementById('schedule-container');
const form = document.getElementById('schedule-form');
const weekdaySelect = document.getElementById('weekday-select');

function loadSchedule() {
  const allSchedules = JSON.parse(localStorage.getItem('bellSchedule') || '{}');
  const day = weekdaySelect.value;
  const schedule = allSchedules[day] || [];
  container.innerHTML = '';
  schedule.forEach(p => {
    container.innerHTML += `
      <div class="period-edit">
        <input type="text" value="${p.name}" placeholder="Period Name" />
        <input type="time" value="${p.start}" />
        <input type="time" value="${p.end}" />
      </div>`;
  });
}

function saveSchedule() {
  const allSchedules = JSON.parse(localStorage.getItem('bellSchedule') || '{}');
  const day = weekdaySelect.value;
  const inputs = container.querySelectorAll('input');
  const schedule = [];
  for (let i = 0; i < inputs.length; i += 3) {
    schedule.push({
      name: inputs[i].value,
      start: inputs[i + 1].value,
      end: inputs[i + 2].value
    });
  }
  allSchedules[day] = schedule;
  localStorage.setItem('bellSchedule', JSON.stringify(allSchedules));
  alert('✅ Bell schedule saved for ' + day);
}

function addPeriod() {
  container.innerHTML += `
    <div class="period-edit">
      <input type="text" placeholder="Period Name" />
      <input type="time" />
      <input type="time" />
    </div>`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  saveSchedule();
});

weekdaySelect.addEventListener('change', loadSchedule);
loadSchedule();
