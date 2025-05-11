const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const dobError = document.getElementById('dobError');

const loadDataBtn = document.getElementById('loadDataBtn');

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = 'Name must be at least 3 characters.';
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email.';
    return false;
  }
  emailError.textContent = '';
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  // Password must have min 8 chars, uppercase, lowercase, digit, special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    passwordError.textContent = 'Password must be min 8 chars, with uppercase, lowercase, number & special char.';
    return false;
  }
  passwordError.textContent = '';
  return true;
}

function validateDOB() {
  const dob = dobInput.value;
  if (!dob) {
    dobError.textContent = 'Please enter your date of birth.';
    return false;
  }
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  if (age < 13) {
    dobError.textContent = 'You must be at least 13 years old.';
    return false;
  }
  dobError.textContent = '';
  return true;
}

// Validate all fields
function validateForm() {
  const validName = validateName();
  const validEmail = validateEmail();
  const validPassword = validatePassword();
  const validDOB = validateDOB();
  return validName && validEmail && validPassword && validDOB;
}

// Save form data to localStorage
function saveFormData() {
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
    dob: dobInput.value
  };
  localStorage.setItem('userFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
  const savedData = localStorage.getItem('userFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    nameInput.value = formData.name || '';
    emailInput.value = formData.email || '';
    passwordInput.value = formData.password || '';
    dobInput.value = formData.dob || '';
    successMessage.textContent = 'Form data loaded from localStorage.';
  } else {
    successMessage.textContent = 'No saved data found.';
  }
}

// Event listeners for live validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
dobInput.addEventListener('change', validateDOB);

// Form submit handler
form.addEventListener('submit', function(e) {
  e.preventDefault();
  successMessage.textContent = '';

  if (validateForm()) {
    saveFormData();
    successMessage.textContent = 'Registration successful! Data saved locally.';
    form.reset();
  } else {
    successMessage.textContent = 'Please fill data properly before submitting.';
  }
});

// Load saved data button handler
loadDataBtn.addEventListener('click', loadFormData);
