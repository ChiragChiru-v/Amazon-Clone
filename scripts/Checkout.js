import { calculateCartQuantity, cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import  formatCurrency  from "./utils/money.js";
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "./deliveryOptions.js";


const today=dayjs();
console.log(today.add(7,'days').format('D MMMM dddd'))

const selectedProducts=document.querySelector('.order-summary');
countCheckoutItems();

cart.forEach((cartItem)=>{
    const {productId}=cartItem;

    let matchingProduct;
    products.forEach((product)=>{
        if (product.id===productId){
            matchingProduct= product;
        }
    })
    const {deliveryOptionId}=cartItem;
    let deliveryOption=deliveryOptions.find((option)=>option.id===deliveryOptionId);

    const today=dayjs();
    const deliveryDay=today.add(deliveryOption.deliveryDays,"days");
    const deliveryDayString=deliveryDay.format("dddd, MMMM D");


    // const matchingProduct=products.find((product)=> product.id===productId)


    selectedProducts.innerHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDayString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id='${matchingProduct.id}'>
                    Update
                  </span>
                  <input class='quantity-input js-quantity-input-${matchingProduct.id}'> 
                  <span class=' link-primary save-quantity-link'  data-product-id='${matchingProduct.id}'>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliverOptionsHTML(matchingProduct,cartItem)}
                
              </div>
            </div>
          </div>`

})

function deliverOptionsHTML(matchingProduct,cartItem){
  let html=''
  deliveryOptions.forEach((option)=>{
      const today=dayjs();
      const deliveryDay=today.add(option.deliveryDays,"days");
      const deliveryDayString=deliveryDay.format("dddd, MMMM D");
      const priceString=Number(formatCurrency(option.priceCents))===0 ? `FREE`:`$${formatCurrency(option.priceCents)}-` ;
      let isChecked= option.id===cartItem.deliveryOptionId
      html+=`<div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  ${isChecked ? 'checked' :''}
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${deliveryDayString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
            </div>
             `
  })
  return html
}

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeFromCart(productId);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        countCheckoutItems();
    })
});

let qty;
document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const {productId}=link.dataset;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        document.querySelector(`.js-quantity-input-${productId}`).addEventListener('keydown',(event)=>{
            if (event.key==='Enter'){
              console.log(event.key);
              updateCheckoutItems(productId);
            }
        })
    })
})


document.querySelectorAll('.save-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId}=link.dataset;
    updateCheckoutItems(productId);
  })
})


function updateCheckoutItems(productId){
  qty=Number(document.querySelector(`.js-quantity-input-${productId}`).value)
  if (qty>=0 && qty<100){
          updateCartQuantity(productId,qty);
          countCheckoutItems();
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML=qty;
      }
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
}


function countCheckoutItems(){
    let qtyCount=calculateCartQuantity();
    const checkoutItems= document.querySelector('.js-cartQty');
    // qtyCount>0 ? checkoutItems.innerHTML=`${qtyCount} Items`: checkoutItems.innerHTML=``;
    checkoutItems.innerHTML=`${qtyCount} Items`;
}
