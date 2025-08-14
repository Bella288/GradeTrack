function checkSchedule() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  document.querySelectorAll('.period').forEach(period => {
    const start = parseTime(period.dataset.start);
    const end = parseTime(period.dataset.end);
    if (currentTime >= start && currentTime <= end) {
      period.classList.add('active');
      const remaining = end - currentTime;
      period.innerHTML += ` - ⏳ ${remaining} min left`;
    } else {
      period.classList.remove('active');
    }
  });
}

function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

setInterval(checkSchedule, 60000);
checkSchedule();
