import { storage } from './local-storage.js';
import { birthdaysForm } from './birthdays-form.js';

const updateNameCell = (row, name) => {
  row.firstElementChild.textContent = name;
};

const updateBirthdayCell = (row, birthday) => {
  const dateStr = new Date(birthday.replace(/-/g, '/')).toLocaleDateString();
  row.firstElementChild.nextElementSibling.textContent = dateStr;
};

const updateRowContent = (row, name, birthday) => {
  updateNameCell(row, name);
  updateBirthdayCell(row, birthday);
};

const createNewTableRow = obj => {
  const { name, birthday, id } = obj;
  const tableBody = document.querySelector('.birthdays-table tbody');
  const newRow = document.createElement('tr');
  newRow.dataset.id = id;
  const nameCell = document.createElement('td');
  const birthdayCell = document.createElement('td');
  const actionsCell = document.createElement('td');
  actionsCell.innerHTML = `<button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>`;
  newRow.append(nameCell, birthdayCell, actionsCell);
  updateRowContent(newRow, name, birthday);
  tableBody.appendChild(newRow);
};

const editRow = (row, name, birthday) => {
  row.style.backgroundColor = '#98d198';
  updateRowContent(row, name, birthday);
  setTimeout(() => {
    row.style.backgroundColor = 'transparent';
  }, 2000);
};

const renderPeople = () => {
  const list = storage.getBirthdaysList() || [];
  list.forEach(person => createNewTableRow(person));
};

const handleTableActions = e => {
  if (e.target.tagName !== 'BUTTON') return;
  const parentRow = e.target.parentElement.parentElement;
  const personId = +parentRow.dataset.id;
  const allRows = document.querySelectorAll('tbody tr');
  allRows.forEach(row => (row.style.backgroundColor = 'transparent'));
  if (e.target.classList.contains('edit-btn')) {
    parentRow.style.backgroundColor = '#ffee90';
    birthdaysForm.editForm(personId);
  } else if (e.target.classList.contains('delete-btn')) {
    storage.deleteFromLocalStorage(personId);
    parentRow.remove();
  }
};

export const birthdaysTable = {
  renderPeople,
  editRow,
  createNewTableRow,
  updateNameCell,
  updateBirthdayCell,
  handleTableActions
};
