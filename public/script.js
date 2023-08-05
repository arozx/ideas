function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.querySelector('.toggle-dark-mode img');
  
  body.classList.toggle('dark-mode');
  
  // Update the image source based on the dark mode state
  const isDarkMode = body.classList.contains('dark-mode');
  if (isDarkMode) {
    darkModeToggle.src = 'sun.svg'; // Relative path to the sun image
  } else {
    darkModeToggle.src = 'moon.svg'; // Relative path to the moon image
  }
  
  // Store the dark mode preference in local storage
  localStorage.setItem('darkMode', isDarkMode);
  
}

// Check the dark mode preference from local storage on page load
window.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const darkModeToggle = document.querySelector('.toggle-dark-mode img');
  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode === 'true' || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    darkModeToggle.src = 'sun.svg'; // Relative path to the sun image
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.src = 'moon.svg'; // Relative path to the moon image
  }
});

const projectForm = document.getElementById('projectForm');

projectForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const difficultyInput = document.getElementById('difficulty');
  const tagsInput = document.getElementById('tags');

  // Client-side input validation
  const maxNameLength = 50;
  const maxDescriptionLength = 200;
  const maxDifficultyLength = 12;
  const maxTagLength = 50;

  if (
    nameInput.value.length > maxNameLength ||
    descriptionInput.value.length > maxDescriptionLength ||
    difficultyInput.value.length > maxDifficultyLength ||
    tagsInput.value.split(',').some(tag => tag.length > maxTagLength)
  ) {
    alert('Input validation failed. Please check your inputs and try again.');
    return; // Do not submit the form if validation fails
  }

  // If validation passes, submit the form
  projectForm.submit();
});
