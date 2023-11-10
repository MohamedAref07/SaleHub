/** @format */

const form = document.querySelector("form");
const name = document.querySelector(`input[name="name"]`);
const email = document.querySelector(`input[name="email"]`);
const password = document.querySelector(`input[name="password"]`);
const errorMessage = document.querySelectorAll(".form_group .errorMessage");
const btn = document.querySelector(".btns .btn");

function getUserDataForm() {
  let userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  if (!validationForm(/^[A-Z][a-z]{3,6}$/, userData.name)) {
    errorMessage[0].textContent = `Name Is Requierd...!`;
  } else {
    errorMessage[0].textContent = ``;
    if (!validationForm(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$$/, userData.email)) {
      errorMessage[1].textContent = `Email Is Requierd...!`;
    } else {
      errorMessage[1].textContent = ``;
      if (!validationForm(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, userData.password)) {
        errorMessage[2].textContent = `Password Is Requierd...!`;
      } else {
        let btnText = btn.textContent;
        errorMessage[2].textContent = ``;
        setUserDataLocalStorage(userData);
        btn.innerHTML = `<i class="fas fa-spinner fa-span"></i>`;
        setTimeout(() => {
          btn.textContent = btnText;
          window.location.assign("login.html");
        }, 3000);
      }
    }
  }
}

function setUserDataLocalStorage(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

function validationForm(rgx, input) {
  let regx = rgx;
  if (regx.test(input)) {
    return true;
  } else {
    return false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getUserDataForm();
});
