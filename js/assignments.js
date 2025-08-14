const classSelect = document.getElementById('class-select');

function getSelectedClass() {
  return localStorage.getItem('selectedClass');
}

function loadClasses() {
  const classSet = new Set();

  // From classes
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  classes.forEach(c => classSet.add(c.name));

  // From schedule
  const allSchedules = JSON.parse(localStorage.getItem('schedule') || '{}');
  Object.values(allSchedules).flat().forEach(p => {
    if (p.name) classSet.add(p.name);
  });

  const classList = Array.from(classSet);
  classSelect.innerHTML = classList.map(name => `<option value="${name}">${name}</option>`).join('');

  const selected = getSelectedClass();
  if (selected) classSelect.value = selected;
}

classSelect.addEventListener('change', () => {
  localStorage.setItem('selectedClass', classSelect.value);
});

loadClasses();
