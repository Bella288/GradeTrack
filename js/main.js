document.addEventListener('DOMContentLoaded', () => {
  console.log("📦 App initialized");

  // Example: Load shared data or setup
  if (typeof renderClasses === 'function') renderClasses();
  if (typeof renderAssignments === 'function') renderAssignments();
  if (typeof showGPA === 'function') showGPA();
});
