function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Store the dark mode preference in local storage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check the dark mode preference from local storage on page load
window.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode === 'true') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});
