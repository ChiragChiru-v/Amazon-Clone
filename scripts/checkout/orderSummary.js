import { calculateCartQuantity, cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import  formatCurrency  from "../utils/money.js";
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary(){
    const selectedProducts=document.querySelector('.js-order-summary');
    selectedProducts.innerHTML='';
   renderCheckoutHeader();
    let checkoutHtml='';

    cart.forEach((cartItem)=>{
        const {productId}=cartItem;

        const matchingProduct=getProduct(productId);
        const {deliveryOptionId}=cartItem;
        let deliveryOption=getDeliveryOption(deliveryOptionId);

        const deliveryDayString=calculateDeliveryDate(deliveryOption);


        // const matchingProduct=products.find((product)=> product.id===productId)


        checkoutHtml+=`
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
                      ${matchingProduct.getPrice()}
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
                      <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id='${matchingProduct.id}'>
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
    selectedProducts.innerHTML=checkoutHtml;
    function deliverOptionsHTML(matchingProduct,cartItem){
      let html=''
      deliveryOptions.forEach((option)=>{  
        const deliveryDayString=calculateDeliveryDate(option);
        const priceString=Number(formatCurrency(option.priceCents))===0 ? `FREE`:`$${formatCurrency(option.priceCents)}-` ;
        let isChecked= option.id===cartItem.deliveryOptionId
        html+=`<div class="delivery-option js-delivery-option" data-product-id='${matchingProduct.id}' data-delivery-option-id='${option.id}'>
                <input type="radio"
                    class="delivery-option-input "
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
            renderCheckoutHeader();
            renderPaymentSummary();
            renderOrderSummary();
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
      console.log(qty);
      if (qty>0 && qty<100){
              updateCartQuantity(productId,qty);
              renderCheckoutHeader();
              document.querySelector(`.js-quantity-label-${productId}`).innerHTML=qty;
      }
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    }


    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
}

