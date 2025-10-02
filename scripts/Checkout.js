import { loadCart } from "../data/cart.js";
import { loadProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// import '../data/backend-practice.js'
// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// })

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve(5);
    });
  }),
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
