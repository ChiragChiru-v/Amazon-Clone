function Cart(store){
const cart={
    cartItem:[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
    }],
    
    loadFromStorage(){
    this.cartItem=JSON.parse(localStorage.getItem(store));
    if(!this.cartItem){
        this.cartItem=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
        },{
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:1,
            deliveryOptionId:'2'
        }];
    }
    },
    saveToStorage(){
    localStorage.setItem(store,JSON.stringify(this.cartItem));
    },

    addToCart(productId,quantity=1){
    let matchingItem;
    this.cartItem.forEach((cartItem)=>{
    if(productId===cartItem.productId){
        matchingItem=cartItem;
    }
    })
    if(matchingItem){
        matchingItem.quantity+=quantity;
    }else{
        this.cartItem.push({
            productId,
            quantity,
            deliveryOptionId:'1'
        })
    }
    this.saveToStorage();

    },

    removeFromCart(productId){
        const newCart=[]
        this.cartItem.forEach((cartItem)=>{
            if (productId!==cartItem.productId)
                newCart.push(cartItem);
        })
        this.cartItem=newCart;
        this.saveToStorage();
    },

    calculateCartQuantity(){
        let qty=0
        this.cartItem.forEach(item=>qty+=item.quantity);
        return qty;
    },

    updateCartQuantity(productId,newQuantity){
        this.cartItem.forEach((cartItem)=>{
            if(cartItem.productId===productId)
                cartItem.quantity=newQuantity;
        })
        this.saveToStorage();
        
    },

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        this.cartItem.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchingItem=cartItem;
        }
        })
        matchingItem.deliveryOptionId=deliveryOptionId;
        this.saveToStorage();
    }

};
return cart;
}
const cart=Cart('cart-oop');
const businessCart=Cart('business-cart');
cart.addToCart( "83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
console.log(businessCart)
console.log(cart)








