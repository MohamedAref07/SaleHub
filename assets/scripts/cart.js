/** @format */

async function addProductToCart(id) {
  let cartContainer = getCartCotianer();
  let cartItem = getCartItemPerId(id);
  console.log(cartItem);
  if (cartItem) {
    cartItem.quantity++;
    cartContainer = updateCartItem(cartContainer, cartItem);
  } else {
    cartContainer.cartItems.push({ id: id, quantity: 1 });
  }
  saveDataToLocalStorage("cart", cartContainer);
  updateCartIcon();
}

function getCartItemPerId(id) {
  console.log(id);
  let cartContainer = getCartCotianer();
  if (cartContainer && cartContainer.cartItems) {
    let cartItem = cartContainer.cartItems.filter((item) => item.id == id);
    if (cartItem) return cartItem[0];
  }
}

function getCartCotianer() {
  let cartContainer = getJsonObjectFromLocalStorage("cart");
  if (!cartContainer)
    cartContainer = {
      cartItems: [],
    };

  return cartContainer;
}

function updateCartItem(cart, cartItem) {
  cart.cartItems[cart.cartItems.findIndex((item) => item.id == cartItem.id)] =
    cartItem;
  return cart;
}
/** @format */

function updateCartIcon() {
  let cartContainer = getCartCotianer();
  let itemsQuantitiesCount = 0;
  cartContainer.cartItems.forEach(
    (item) => (itemsQuantitiesCount += item.quantity)
  );
  document.querySelector(".cart span").textContent = itemsQuantitiesCount;
}

updateCartIcon();
displayAllCartItems();

function displayAllCartItems() {
  let cartContainer = getCartCotianer();
  cartContainer.cartItems.forEach((item) => {
    displayCartItem(item.id, item.quantity);
  });
}

async function displayCartItem(id, quantity) {
  let cartItemFetchCall = await fetch(`http://localhost:3000/product/${id}`);
  let cartItem = await cartItemFetchCall.json();
  console.log(cartItem);
  let cartItemTemplate = document.querySelector(".cart-items");
  cartItemTemplate.innerHTML += `
  <div class="products_cart">
  <div class="row d-flex align-items-center">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-2 d-flex align-items-center">
          <div class="cart-item-image">
            <img
              width="100"
              height="100"
              src='${cartItem.image}'
              alt=""
            />
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div class="d-flex flex-column ps-5 ms-5">
            <p class="cart-item-title">${cartItem.category}</p>
            <p class="cart-item-description">${cartItem.for}</p>
            <p class="cart-item-caption">caption</p>
          </div>
        </div>
        <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
            <p>Price</p>
          <p class="cart-item-price">${cartItem.price}</p>
        </div>
      </div>
    </div>
    <div class="col-md-6 ">
      <div class="row">
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <p>Quantity</p>
          <p class="cart-item-quantity">${quantity}</p>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <p>Total</p>
          <p class="cart-item-total">$${
            quantity * cartItem.price.replace("$", "")
          }</p>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}
