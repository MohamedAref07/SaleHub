/** @format */

let menProducts = [];
async function manProducts(endPoint) {
  let res = await fetch(`http://localhost:3000/product?for=${endPoint}`);
  let finalRes = await res.json();
  console.log(finalRes);
  displaymanProducts(finalRes);
  menProducts.push(...finalRes);
}

function displaymanProducts(data) {
  let temp = ``;
  data.forEach(
    (data) =>
      (temp += `
        <div class="product_card" id=${data.id}>
        <div class="product_image">
        <img
          src="${data.image}"
          alt=""
        />
        <div class="product_buttons">
          <span class="wishlist"
            ><i class="fa-regular fa-heart"></i
          ></span>
          <span class="addcart"
            ><i class="fa-solid fa-cart-shopping"></i
          ></span>
        </div>
        <button id=${data.id} class="btn btn-dark view">View Product</button>
      </div>
      <div class="product_details">
        <p>${data.description}</p>
        <span class="price">${data.price}</span>
      </div>
    </div>
    `)
  );
  document.querySelector(".products").innerHTML = temp;
}

function makeProductWorks() {
  let viewBtns = document.querySelectorAll("button.view");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = btn.getAttribute("id").replace("product_", "");
      console.log(productId);
      let productDetails = menProducts.find((p) => p.id == productId);
      saveDataToLocalStorage("productDetails", productDetails);
      location.assign("product.html");
    });
  });
}
async function loadAllProducts() {
  await manProducts("man");
  makeProductWorks();
}

loadAllProducts();

const search = document.querySelector(".navbar_form .search");
const login = document.querySelector(".navbar_form .login");
const wishlist = document.querySelector(".navbar_form .wishlist");
const cart = document.querySelector(".navbar_form .cart");
const toggle = document.querySelector(".navbar_toggle");
const searchBar = document.querySelector(".search_bar");
const toggleMenu = document.querySelector(".toggle_menu");
const overLay = document.querySelector(".overlay");
const wishListCount = document.querySelector(".wishlist span");

search.addEventListener("click", function () {
  searchBar.classList.toggle("hidden");
});

login.addEventListener("click", function () {
  location.assign("register.html");
});

toggle.addEventListener("click", function () {
  toggleMenu.classList.remove("hidden");
  overLay.classList.remove("hidden");
});
overLay.addEventListener("click", function () {
  toggleMenu.classList.add("hidden");
  overLay.classList.add("hidden");
});
// ==================================================================
wishlist.addEventListener("click", () => {
  location.assign("wishlist.html");
});

let wishlistContainer = [];
async function addProductToWishlist(id) {
  let res = await fetch(`http://localhost:3000/product`);
  let finalRes = await res.json();
  wishlistContainer.push(finalRes[id]);
  // console.log();
  saveDataToLocalStorage("wishlist", wishlistContainer);
  wishListCount.textContent = JSON.parse(
    localStorage.getItem("wishlist")
  ).length;
}
