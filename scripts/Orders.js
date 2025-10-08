import { orders } from "../data/orders.js";
import dayjs from " https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import formatCurrency from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";

renderOrderPage();
async function renderOrderPage() {
  await loadProductsFetch();
  renderOrdergrid();
}

export function renderOrdergrid() {
  let OrderHTML = "";
  orders.forEach((element) => {
    const orderDate = dayjs(element.orderTime).format("MMMM DD");
    const totalCost = formatCurrency(element.totalCostCents);
    const orderId = element.id;
    let resultHtml = "";
    element.products.forEach((product, index) => {
      const item = getProduct(product.productId);
      const dateString = dayjs(
        element.products[index].estimatedDeliveryTime
      ).format("MMMM DD");
      const quantity = element.products[index].quantity;
      resultHtml += `<div class="product-image-container">
              <img src="${item.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${item.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${dateString}</div>
              <div class="product-quantity">Quantity: ${quantity}</div>
              <button class="buy-again-button button-primary" data-product-id=${item.id} data-quantity=${quantity}>
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${element.id}&productId=${item.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
    });

    // console.log(resultHtml);

    OrderHTML += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalCost}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${resultHtml}
            </div>
          </div>
        </div>
    `;
  });

  document.querySelector(".orders-grid").innerHTML = OrderHTML;
  const buyAgainBtn = document.querySelectorAll(".buy-again-button");
  console.log(buyAgainBtn[0]);
  buyAgainBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const { productId, quantity } = btn.dataset;
      addToCart(productId, Number(quantity));
      window.location.href = "checkout.html";
    });
  });
}
