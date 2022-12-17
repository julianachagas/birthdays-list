const storageKey = 'birthdaysList';

const getBirthdaysList = () => {
  return JSON.parse(localStorage.getItem(storageKey));
};

const addToLocalStorage = newBirthday => {
  const list = getBirthdaysList() || [];
  list.push(newBirthday);
  localStorage.setItem(storageKey, JSON.stringify(list));
};

const updateLocalStorage = (id, name, date) => {
  const list = getBirthdaysList();
  const person = list.find(person => person.id === id);
  person.name = name;
  person.birthday = date;
  localStorage.setItem(storageKey, JSON.stringify(list));
};

const deleteFromLocalStorage = id => {
  const list = getBirthdaysList();
  const newList = list.filter(person => person.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(newList));
};

export const storage = {
  getBirthdaysList,
  addToLocalStorage,
  updateLocalStorage,
  deleteFromLocalStorage
};
