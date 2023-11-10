/** @format */

const btn = document.querySelector(".btns button");
const form = document.querySelector("form");
const email = document.querySelector(`input[name="email"]`);
const password = document.querySelector(`input[name="password"]`);
const errorMessage = document.querySelectorAll(".form_group .errorMessage");

function getUserDataLocalStrorage() {
  if (localStorage.getItem("userData")) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.email != email.value) {
      errorMessage[0].textContent = "Wrong Email";
    } else {
      errorMessage[0].textContent = "";
      if (userData.password != password.value)
        errorMessage[1].textContent = "Wrong Password";
      else {
        let btnText = btn.textContent;
        errorMessage[1].textContent = ``;
        btn.innerHTML = `<i class="fas fa-spinner fa-span"></i>`;
        setTimeout(() => {
          btn.textContent = btnText;
          window.location.assign("index.html");
        }, 3000);
      }
    }
  } else {
    let btnText = btn.textContent;
    btn.innerHTML = `<i class="fas fa-spinner fa-span"></i>`;
    account.textContent = "You don't have an account";
    setTimeout(() => {
      btn.textContent = btnText;
      window.location.assign("register.html");
    }, 3000);
    console.log("Nooo");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getUserDataLocalStrorage();
});
