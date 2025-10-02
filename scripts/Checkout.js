import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// import '../data/backend-practice.js'
// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// })

async function loadPage() {
  console.log("load Page");
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log("unexpected error", error);
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("hai");
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
  */
