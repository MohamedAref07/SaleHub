/** @format */

function getJsonObjectFromLocalStorage(key) {
  let storedValue = localStorage.getItem(key);
  return JSON.parse(storedValue);
}

function saveDataToLocalStorage(type, data) {
  localStorage.setItem(`${type}`, JSON.stringify(data));
}
