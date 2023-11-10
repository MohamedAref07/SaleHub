/** @format */

function displayProductDetails(data) {
  let productImage = document.getElementById("product_image");
  let productDescription = document.getElementById("product_description");
  let productPrice = document.getElementById("product_price");

  productImage.setAttribute("src", data.image);
  productDescription.innerText = data.description;
  productPrice.innerText = data.price;
}

const getProduct = localStorage.getItem("productDetails");
displayProductDetails(JSON.parse(getProduct));

const inputCounter = document.querySelector(".counter input[type='number']");
let counter = inputCounter.value;
const plusBtn = document.querySelector(".counter .plus");
const minusBtn = document.querySelector(".counter .minus");
plusBtn.addEventListener("click", function () {
  counter++;
  inputCounter.value = counter;
});
minusBtn.addEventListener("click", function () {
  if (counter < 2) {
    return;
  }
  counter--;
  inputCounter.value = counter;
});
