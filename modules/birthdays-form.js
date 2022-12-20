import { storage } from './local-storage.js';
import { birthdaysTable } from './birthdays-table.js';

class Person {
  constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.id = Date.now();
  }
}

const customValidationMessage = {
  text: 'The name must be between 3 - 50 characters long and contain only letters',
  date: 'Please enter a valid date'
};

const hideInputFeedback = input => {
  const feedback = input.nextElementSibling;
  feedback.classList.add('hidden');
};

const displayInputFeedback = input => {
  const feedback = input.nextElementSibling;
  feedback.classList.remove('hidden');
};

const validateInput = input => {
  const customMessage = customValidationMessage[input.type];
  // set custom message
  input.setCustomValidity(customMessage);
  // display feedback message
  displayInputFeedback(input);
};

const handleInput = input => {
  input.setCustomValidity('');
  hideInputFeedback(input);
  const idBeingEdited = +document.querySelector('.birthdays-form').dataset.edit;
  if (!idBeingEdited) return;

  if (!input.validity.valid) {
    displayInputFeedback(input);
    return;
  }
  const row = document.querySelector(
    `.birthdays-table tbody tr[data-id="${idBeingEdited}"]`
  );
  if (input.type === 'text') {
    birthdaysTable.updateNameCell(row, input.value);
  } else {
    birthdaysTable.updateBirthdayCell(row, input.value);
  }
};

const handleBirthdaysForm = e => {
  e.preventDefault();
  const idBeingEdited = +e.target.dataset.edit;
  const name = document.getElementById('person-name').value.trim();
  const date = document.getElementById('birth-date').value;
  if (!idBeingEdited) {
    const personObj = new Person(name, date);
    storage.addToLocalStorage(personObj);
    birthdaysTable.createNewTableRow(personObj);
  } else {
    storage.updateLocalStorage(idBeingEdited, name, date);
    const row = document.querySelector(
      `.birthdays-table tbody tr[data-id="${idBeingEdited}"]`
    );
    birthdaysTable.editRow(row, name, date);
    const editFeedback = document.querySelector('.edit-feedback');
    editFeedback.classList.remove('hidden');
    setTimeout(() => {
      editFeedback.classList.add('hidden');
    }, 2000);
    e.target.dataset.edit = '';
  }
  e.target.reset();
};

const editForm = id => {
  const list = storage.getBirthdaysList();
  const person = list.find(person => person.id === id);
  const { name, birthday } = person;
  const nameInput = document.querySelector('#person-name');
  nameInput.value = name;
  const dateInput = document.querySelector('#birth-date');
  dateInput.value = birthday;
  nameInput.focus();
  const birthdaysForm = document.querySelector('.birthdays-form');
  birthdaysForm.dataset.edit = id;
};

export const birthdaysForm = {
  handleInput,
  validateInput,
  handleBirthdaysForm,
  editForm
};
