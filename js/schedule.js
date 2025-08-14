function getTodaySchedule() {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = weekdays[new Date().getDay()];
  const allSchedules = JSON.parse(localStorage.getItem('bellSchedule') || '{}');
  return allSchedules[today] || [];
}

function renderSchedule() {
  const schedule = getTodaySchedule();
  const container = document.getElementById('schedule');
  container.innerHTML = schedule.map(p => `
    <div class="period" data-start="${p.start}" data-end="${p.end}">${p.name}</div>
  `).join('');
  checkSchedule();
}

function checkSchedule() {
  const now = new Date();
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  const periods = document.querySelectorAll('.period');
  periods.forEach(p => {
    const start = p.getAttribute('data-start');
    const end = p.getAttribute('data-end');
    if (currentTime >= start && currentTime <= end) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });
}

setInterval(checkSchedule, 60000);
renderSchedule();
