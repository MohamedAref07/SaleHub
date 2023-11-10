/** @format */
const wishListCount = document.querySelector(".wishlist span");
let wishList;
function getDataFromLocalStorage() {
  wishList = getJsonObjectFromLocalStorage("wishlist");
  if (wishList) {
    displayWishlist(wishList);
    wishListCount.textContent = wishList.length;
  }
}

getDataFromLocalStorage();

function displayWishlist(data) {
  let temp = "";
  data.forEach(
    (dataItem) =>
      (temp += `<div class="product_card" id="${dataItem.id}">
      <div class="product_image">
      <img
        src="${dataItem.image}"
        alt=""
      />
      <div class="product_buttons">
        <span class="active wishlist" onclick="removeFromWishList(this)"
          ><i class="fa-regular fa-heart"></i
        ></span>
        <span class="addcart"
          ><i class="fa-solid fa-cart-shopping"></i
        ></span>
      </div>
      <button id=${dataItem.id} class="btn btn-dark view">Buy Product</button>
    </div>
    <div class="product_details">
      <p>${dataItem.description}</p>
      <span class="price">${dataItem.price}</span>
    </div>
  </div>
  `)
  );
  temp.length == 0
    ? (document.querySelector(
        ".wishListPage .container"
      ).innerHTML = `<h1>Wishlist Is Empty</h1>`)
    : (document.querySelector(".wishListPage .container").innerHTML = temp);
}
function removeFromWishList(e) {
  let newData = JSON.parse(localStorage.getItem("wishlist")) || [];
  let removeId = e.closest(".product_card").getAttribute("id");
  e.closest(".product_card").remove();
  let data = newData.filter((data) => data.id != removeId);
  saveDataToLocalStorage("wishlist", [...data]);
  newData.push(...data);
  wishListCount.textContent = JSON.parse(
    localStorage.getItem("wishlist")
  ).length;
}
