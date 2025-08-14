const form = document.getElementById('add-assignment-form');
const list = document.getElementById('assignment-list');
const classSelect = document.getElementById('class-select');

function getSelectedClass() {
  const params = new URLSearchParams(window.location.search);
  return params.get('class');
}

function loadClasses() {
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  classSelect.innerHTML = classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  const selected = getSelectedClass();
  if (selected) classSelect.value = selected;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const assignment = {
    class: classSelect.value,
    title: form['assignment-title'].value,
    link: form['assignment-link'].value,
    due: form['due-date'].value,
    category: form['category'].value,
