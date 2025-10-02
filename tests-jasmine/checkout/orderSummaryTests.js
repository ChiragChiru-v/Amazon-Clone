import { loadFromStorage } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("Test Suite: RenderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
  });
  it("display the cart", () => {
    loadFromStorage();
    renderOrderSummary();
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(2);
  });

  it("removes a element ", () => {
    renderOrderSummary();
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
  });
});
