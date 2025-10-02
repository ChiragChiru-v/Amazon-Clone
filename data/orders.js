export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
  console.log(order.orderTime);
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
