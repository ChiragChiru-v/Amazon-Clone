import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQty = calculateCartQuantity();
  const headerHTML = `Checkout (<a class="return-to-home-link js-cartQty"
            href="index.html">${cartQty} items</a>)`;
  document.querySelector(".js-checkout").innerHTML = headerHTML;
}
