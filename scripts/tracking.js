import { orders } from "../data/orders.js";
import dayjs from " https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");
let order;
let orderedProduct;
let deliveryDayString;
let productName;
let productQty;
let productImageUrl;
document.querySelector(".search-bar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    window.location.href = `index.html?query=${e.target.value}`;
  }
});
getTrackingdetails();

async function getTrackingdetails() {
  order = orders.find((order) => order.id === orderId);
  console.log(order);
  orderedProduct = order.products.find(
    (product) => product.productId === productId
  );
  deliveryDayString = dayjs(orderedProduct.estimatedDeliveryTime).format(
    "dddd, MMMM DD"
  );
  productQty = orderedProduct.quantity;
  //   console.log(deliveryDayString);
  await loadProductsFetch();
  const product = getProduct(productId);
  productName = product.name;
  productImageUrl = product.image;
  console.log(product);
  const html = `<div class="delivery-date">Arriving on ${deliveryDayString}</div>

        <div class="product-info">
            ${productName}        
        </div>

        <div class="product-info">Quantity: ${productQty}</div>

        <img
          class="product-image"
          src="${productImageUrl}"
        />

        <div class="progress-labels-container">
          <div class="progress-label-1">Preparing</div>
          <div class="progress-label-2">Shipped</div>
          <div class="progress-label-3">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;

  document.querySelector(".order-tracking").innerHTML = html;
  updateStatusBar();
}

function updateStatusBar() {
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderedProduct.estimatedDeliveryTime);
  const currentTime = dayjs(); // now

  const elapsed = currentTime.diff(orderTime, "second");
  const total = deliveryTime.diff(orderTime, "second");

  let progress = (elapsed / total) * 100;
  if (progress < 1) {
    progress = 3.86;
  }

  document.querySelector(".progress-bar").style = `width:${Number(
    progress.toFixed(2)
  )}%`;
  console.log(progress);

  if (0 <= progress <= 49) {
    document.querySelector(".progress-label-1").classList.add("current-status");
  } else if (50 <= progress <= 99) {
    document.querySelector(".progress-label-2").classList.add("current-status");
  } else {
    document.querySelector(".progress-label-3").classList.add("current-status");
  }
}
