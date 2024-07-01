const sub = document.querySelector(".sub-total-price");
console.log(sub);
var price = localStorage.getItem("prices", JSON.stringify(price));
var RemoveF = price.slice(1);
var lastPrice = RemoveF.slice(0, RemoveF.length - 1);
sub.innerHTML = lastPrice;
