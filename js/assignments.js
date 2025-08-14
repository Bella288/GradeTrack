const form = document.getElementById('add-assignment-form');
const list = document.getElementById('assignment-list');
const classSelect = document.getElementById('class-select');

function loadClasses() {
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');
  classSelect.innerHTML = classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const assignment = {
    class: classSelect.value,
    title: form['assignment-title'].value,
    link: form['assignment-link'].value,
    due: form['due-date'].value,
    category: form['category'].value,
    points: form['points'].value,
    done: false
  };
  saveAssignment(assignment);
  renderAssignments();
  form.reset();
});

function saveAssignment(data) {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  assignments.push(data);
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

function renderAssignments() {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const now = new Date();
  list.innerHTML = assignments.map(a => {
    const due = new Date(a.due);
    let statusClass = '';
    if (!a.done && due < now) statusClass = 'missing';
    else if (!a.done && (due - now) / (1000 * 60 * 60 * 24) < 2) statusClass = 'upcoming';
    return `<div class="assignment ${statusClass}">
      <strong>${a.title}</strong> (${a.class}) - Due: ${a.due}
      ${a.link ? `<a href="${a.link}" target="_blank">🔗</a>` : ''}
      ${a.done ? '✅' : '<button onclick="markDone(\'' + a.title + '\')">Mark Done</button>'}
    </div>`;
  }).join('');
}

function markDone(title) {
  const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
  const index = assignments.findIndex(a => a.title === title);
  if (index !== -1) {
    assignments[index].done = true;
    const grade = prompt("Enter grade for this assignment:");
    assignments[index].grade = grade;
    localStorage.setItem('assignments', JSON.stringify(assignments));
    renderAssignments();
  }
}

loadClasses();
renderAssignments();

