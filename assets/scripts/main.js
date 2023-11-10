/** @format */

const swiper_banner = new Swiper(".swiper_banner", {
  speed: 400,
  autoplay: {
    delay: 3000,
  },
  loop: true,
});

const swiper_review = new Swiper(".swiper_review", {
  speed: 400,
  spaceBetween: 50,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
const swiper_product = new Swiper(".swiper_product", {
  speed: 400,
  spaceBetween: 30,
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});
// ============================================================================
let allProducts = [];
async function Products() {
  let res = await fetch(`http://localhost:3000/product`);
  let finalRes = await res.json();
  allProducts.push(...finalRes);
  displayProducts(finalRes);
}

function displayProducts(data) {
  const forHimContainer = document.querySelector(".forhim .swiper-wrapper");
  const forHerContainer = document.querySelector(".forher .swiper-wrapper");
  data.forEach((data) => {
    let temp = `
      <div class="swiper-slide">
        <div class="product_container">
          <img src="${data.image}" alt="" />
          <div class="product_buttons">
            <span class="wishlist" onclick="addProductToWishlist(${data.id})">
              <i class="fa-regular fa-heart"></i>
            </span>
            <span class="addcart" onclick="addProductToCart(${data.id})">
              <i class="fa-solid fa-cart-shopping"></i>
            </span>
          </div>
          <button id="product_${data.id}" class="btn btn-dark view">View Product</button>
        </div>
      </div>
    `;

    if (data.for === "man") {
      forHimContainer.innerHTML += temp;
    } else {
      forHerContainer.innerHTML += temp;
    }
  });
  // ? (document.querySelector(".forhim .swipper-wrapper").innerHTML = temp)
  // : "";
}
// ======================================================================================

function makeProductWorks() {
  let viewBtns = document.querySelectorAll("button.view");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = btn.getAttribute("id").replace("product_", "");
      console.log(productId);
      let productDetails = allProducts.find((p) => p.id == productId);
      saveDataToLocalStorage("productDetails", productDetails);
      location.assign("product.html");
    });
  });
}

// function saveDataToLocalStorage(type, data) {
//   localStorage.setItem(`${type}`, `${data}`);
// }

async function loadAllProducts() {
  await Products();
  makeProductWorks();
}

loadAllProducts();
// ======================================================================

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
cart.addEventListener("click", () => {
  location.assign("cart.html");
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
