import { birthdaysForm } from './modules/birthdays-form.js';
import { birthdaysTable } from './modules/birthdays-table.js';

document.addEventListener('DOMContentLoaded', birthdaysTable.renderPeople);

// submit birthdays form
const form = document.querySelector('.birthdays-form');
form.addEventListener('submit', birthdaysForm.handleBirthdaysForm);

// birthdays Table: edit/delete
const table = document.querySelector('.birthdays-table');
table.addEventListener('click', birthdaysTable.handleTableActions);

// set max date: today's date in the YYYY-MM-DD format
const dateInput = document.querySelector('#birth-date');
const maxInputDate = new Date().toLocaleDateString('en-ca');
dateInput.max = maxInputDate;

// inputs
const inputs = document.querySelectorAll('.birthdays-form input');
inputs.forEach(input => {
  input.addEventListener('input', function () {
    birthdaysForm.handleInput(this);
  });
  input.addEventListener('invalid', function () {
    birthdaysForm.validateInput(this);
  });
});
