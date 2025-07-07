const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const emailInput = form.querySelector('input[name="email"]');

populateForm();

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', onInputChange);

function handleSubmit(event) {
  event.preventDefault();

  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
}

function onInputChange(event) {
  const targetElement = event.target;
  const fieldName = targetElement.name;
  const fieldValue = targetElement.value;

  if (fieldName === 'email' || fieldName === 'message') {
    formData[fieldName] = fieldValue;
    const stringifiedData = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, stringifiedData);
  }
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return;

  const parsedData = JSON.parse(savedData);
  formData.email = parsedData.email || '';
  emailInput.value = parsedData.email || '';
  formData.message = parsedData.message || '';
  textarea.value = parsedData.message || '';
}
