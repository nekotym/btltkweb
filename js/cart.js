/* cart */
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
function ready() {
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}
function removeItem(id) {
  if (confirm("Remove this ?")) {
    let items = [];
    JSON.parse(localStorage.getItem("items")).map((data) => {
      if (data.id != id) {
        items.push(data);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
    window.location.reload();
    updateCartTotal();
  }
}
function removeQuantity(id) {
  items.map((data) => {
    if (data.id == id && data.no > 0) {
      data.no--;
      localStorage.setItem("items", JSON.stringify(items));
    } else if (data.no == 0) {
      removeItem(id);
    }
  });
  render();
}
function addQuantity(id) {
  items.map((data) => {
    if ((data.id == id && data.no > 0) || data.no == 0) {
      data.no++;
      localStorage.setItem("items", JSON.stringify(items));
    }
    // } else if (data.no == 0) {
    //   addQuantity(id);
    // }
  });
  render();
}
function removeAllItem() {
  if (confirm("Remove all ?")) {
    if (JSON.parse(localStorage.getItem("items")) === null) {
      alert("No Items Found");
    } else {
      localStorage.removeItem("items");
      window.location.reload();
      updateCartTotal();
    }
  }
}
// function login() {
//   if (JSON.parse(localStorage.getItem("accounts")) === null) {
//     window.location = "../login.html";
//   }
// }
// const localAccounts = JSON.parse(localStorage.getItem("accounts"));
// const localLogins = JSON.parse(localStorage.getItem("logins"));

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const localItems = JSON.parse(localStorage.getItem("items"));
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var shopIMG = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopIMG.getElementsByClassName("shop-item-image")[0].src;
  let items = [];
  var id = generateString(5);
  if (typeof Storage !== "undefined") {
    let item = {
      title,
      price,
      imageSrc,
      id,
      no: 1,
    };
    if (JSON.parse(localStorage.getItem("logins")) === null) {
      window.location = "../html/login.html";
    } else {
      if (JSON.parse(localStorage.getItem("items")) === null) {
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("items"));
        localItems.map((data) => {
          if (item.title == data.title) {
            if (confirm("Thí product í already available. Do you want mỏe ?")) {
              item.no = data.no + 1;
              alert("Added");
            } else {
              window.location.reload();
            }
          } else {
            items.push(data);
          }
        });
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        window.location.reload();
      }
    }
  } else {
    alert("LocalStorage is not working on your browser");
  }
}
//icon shopping
const iconShoppingP = document.querySelector(".iconShopping p");
let no = 0;
if (JSON.parse(localStorage.getItem("items")) === null) {
  no = 0;
} else {
  JSON.parse(localStorage.getItem("items")).map((data) => {
    no = no + data.no;
  });
}
iconShoppingP.innerHTML = no;
/*=============================================================*/
/************* add to cart*************************cart data*/
const cartId = document.querySelector("#cart");
const cartBoxTable = cartId.querySelector("table");
console.log(cartBoxTable);
function render() {
  let tableData = ``;
  tableData += `<thead>
    <tr>
      <td>Image</td>
      <td>MA DON HANG</td>
      <td>Product</td>
      <td>Quantity</td>
      <td>Price</td>
      <td>Sub Price</td>
       <td>
     Add
      </td>
      <td>
      Minus
      </td>
    
    </td>
    </tr>
    </thead>`;
  if (JSON.parse(localStorage.getItem("items")) === null) {
    tableData += `<tr><td colspan="6" style="font-size:25px; font-weight:bold;">No items found</td></tr>`;
  } else if (JSON.parse(localStorage.getItem("items")) == []) {
    tableData += `<tr><td colspan="6" style="font-size:25px; font-weight:bold;">No items found</td></tr>`;
  } else {
    JSON.parse(localStorage.getItem("items")).map((data) => {
      tableData += ` <tbody>
        <tr>
          <td><img src="${data.imageSrc}" /></td>
          <td>${data.id}</td>
          <td>${data.title}</td>
          <td>
          ${data.no}</td>
          <td>${data.price}</td>
          <td>${data.price * data.no}.00</td>
          <td><button class="normal" onclick="addQuantity('${
            data.id
          }') " >Add</button></td>
          <td><button class="normal" onclick="removeQuantity('${
            data.id
          }') " >Minus</button></td>
          <td><button class="normal" onclick="removeItem('${
            data.id
          }')" >Remove</button></td>
        </tr>
      </tbody>`;
    });
    updateCartTotal();
  }
  cartBoxTable.innerHTML = tableData;
}
/*=============================================================*/
/*=============================================================*/
/*total*/
function updateCartTotal() {
  var total = 0;
  if (JSON.parse(localStorage.getItem("items")) === null) {
    total = 0;
  } else {
    JSON.parse(localStorage.getItem("items")).map((data) => {
      total =
        total +
        Math.round((parseFloat(data.price) * data.no + Number.EPSILON) * 100) /
          100;
    });
  }
  const cartTotal = document.querySelector(".cart-total-price");
  console.log(cartTotal);
  cartTotal.innerHTML = "$" + total + ".00";
}
/*=================Apply Coupon -50%=====================*/
function updateCartCoupon() {
  var total = 0;
  if (JSON.parse(localStorage.getItem("items")) === null) {
    total = 0;
  } else {
    JSON.parse(localStorage.getItem("items")).map((data) => {
      total =
        total +
        ((Math.round(
          (parseFloat(data.price) * data.no + Number.EPSILON) * 100
        ) /
          100) *
          50) /
          100;
    });
  }
  const cartTotal = document.querySelector(".cart-total-price");
  console.log(cartTotal);
  cartTotal.innerHTML = "$" + total + ".00";
}

/*=============================================================*/
/*coupon*/
localStorage.setItem("coupon", "FA-50%");
function couponApply() {
  if (
    document.querySelector(".coupon-input").value ==
    localStorage.getItem("coupon")
  ) {
    const couponvalue = document.querySelector(".coupon-value");
    couponvalue.innerHTML = document.querySelector(".coupon-input").value;
    updateCartCoupon();
  } else {
    alert("Invalid");
    window.location.reload();
  }
}

/*check out*/
function checkout() {
  const cartPrice = document.querySelector(".cart-total-price").innerHTML;
  const couPon = document.querySelector(".coupon-value").innerHTML;
  console.log(cartPrice);
  var cp = couPon;
  var price = cartPrice;
  localStorage.setItem("prices", JSON.stringify(price));
  localStorage.setItem("cpon", JSON.stringify(cp));
  window.location = "payment.html";
}

function inFormation() {
  var name = document.forms["payment"]["name"].value;
  var phone = document.forms["payment"]["number"].value;
  var kiemTraDT = isNaN(phone);
  var email = document.forms["payment"]["email"].value;
  var acong = email.indexOf("@");
  var daucham = email.lastIndexOf(".");
  var address = document.forms["payment"]["address"].value;
  var note = document.forms["payment"]["note"].value;
  var choose = document.forms["price"]["pay"].value;
  var httt;
  var price = document.querySelector(".sub-total-price").innerHTML;
  var cp = localStorage.getItem("cpon", JSON.stringify(cp));
  var RemoveF = cp.slice(1);
  var coupon = RemoveF.slice(0, RemoveF.length - 1);
  var bankAccount = document.forms["price"]["stk"].value;
  var ktBA = isNaN(bankAccount);
  var total = 0;
  if (name == "") {
    alert("Họ tên không được để trống");
    return false;
  }
  if (phone == "") {
    alert("Điện thoại không được để trống");
    return false;
  }
  if (phone.length != 10) {
    alert("Điện thoại định dạng 10 số");
    return false;
  }
  if (kiemTraDT == true) {
    alert("Điện thoại phải ở định dạng số");
    return false;
  }

  if (email == "") {
    alert("Email không được để trống");
    return false;
  } else if (acong < 1 || daucham < acong + 2 || daucham + 2 > email.length) {
    alert("Email không đúng định dạng");
    return false;
  }
  if (address == "") {
    alert("Địa chỉ không được để trống");
    return false;
  }
  if (choose == "") {
    alert("Chọn phương thức thanh toán");
    return false;
  } else {
    if (choose == "cash") {
      httt = "Payment in cash";
    }
    if (choose == "banking") {
      if (bankAccount == "") {
        alert("nhập số tài khoản");
        return false;
      }
      if (ktBA == true) {
        alert("Số tài khoản là dạng số");
        return false;
      }
      httt = "Online Banking";
    }
  }
  console.log(name);
  console.log(phone);
  console.log(email);
  console.log(address);
  if (note != "") {
    console.log(note);
  }
  console.log(price);
  console.log(httt);
  if (httt == "Payment in cash") {
    bankAccount = "";
  }
  if ((httt = "Online Banking")) {
    if (bankAccount != "") {
      console.log(bankAccount);
    }
  }

  var table =
    ` <img
    style="width: 144px; height: 91px;"
    src="mayra_img/images/black-logo.png"
    alt=""
  />
    <section style="text-align: center">
  <h1>SALE RECEIPT</h1>
  <div>(Electronic bill)</div>
  <div class="ngay">
    <p id="date"></p>
    <script>
      n = new Date();
      y = n.getFullYear();
      m = n.getMonth() + 1;
      d = n.getDate();
      document.getElementById("date").innerHTML =
        "Hung Yen,  " + d + "/" + m + "/" + y;
    </script>
  </div>
</section>
<div class="DVBH">Store: ANH STORE</div>
<div class="strO">Store Owner: Lê Nguyễn Đức Anh</div>
<div class="tax">Tax Identification Number: 0123456772003</div>
<div class="addr">Address: 179 Van Giang, Van Giang District, Hung Yen Province, Viet Nam</div>
<div class="phone">Phone number: 101211-10121739</div>
<div class="stk">Account Number: 0723456772003</div>

<div class="nguoimua">Customer: ` +
    name +
    `</div>
<div class="phone">Phone number: ` +
    phone +
    `</div>
<div class="email">Email: ` +
    email +
    `</div>
<div class="addr">Address: ` +
    address +
    `</div>
<div class="note">Note: ` +
    note +
    `</div>
<div class="payment">Payment Method: ` +
    httt +
    `</div>
<div class="stk">Account Number: ` +
    bankAccount +
    `</div>

<table border="1">
  <thead>
    <tr>
      <td class="id">ID</td>
      <td class="img">Image</td>
      <td class="product">Product</td>
      <td class="quantity">Quantity</td>
      <td class="price" >Price</td>
    </tr>
  </thead>
`;
  var n = 0;

  JSON.parse(localStorage.getItem("items")).map((data) => {
    table +=
      `
      <tbody>
      <tr>
        <td class="id">` +
      ++n +
      `</td>
      <td class="img"><img src="${data.imageSrc}" alt="" />
      </td>
        <td class="product">${data.title}
      </td>
        <td class="quantity">${data.no}</td>
        <td class="price"> ` +
      "$" +
      `${data.price * data.no}.00 </td>
      </tr>
    </tbody>
  `;
    total =
      total +
      Math.round((parseFloat(data.price) * data.no + Number.EPSILON) * 100) /
        100;
  });
  // for (let i = 0; i < x.length; i++) {}

  table +=
    `
    <tr>
    <td colspan="4" class="total-price">Subtotal</td>
    <td>` +
    "$" +
    total +
    ".00" +
    `</td> </tr>
    <tr>
  <td colspan="4" class="total-price">Coupon</td>
  <td>` +
    coupon +
    `</td>
  </tr>
  <tr>
  <td colspan="4" class="total-price">Total</td>
  <td>` +
    price +
    `</td> </tr>
  </table>
  <div class="sig">Shop's signature</div>
  <div class="note-sign">(Sign and write full name)</div>`;
  printHTML(table);
}
/* printCart */
function printHTML(data) {
  let popupWin = window.open(
    "",
    "_blank",
    "top=0,left=0,height=100%,width=auto"
  );
  popupWin.document.write(`
  <html>
  <head>
  <title>Sale receipt</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      width: 1000px;
      margin: auto;
    }
    h1 {
      padding-top:5px;
    }
    table {
      margin-top: 15px;
      width: 100%;
      border: 1px solid;
      text-align: center;
    }
    .id {
      width: 50px;
    }
    .img {
      width: 200px;
    }
    .quantity {
      width: 50px;
    }
    .product {
      // text-align:left;
      width: 300px;
    }
    .price {
      width: 100px;
    }
    .total-price{
      text-align:center;
      font-weight:bold;
    }
    img {
      height: 50px;
      width: 50px;
    }
    .DVBH {
      font-weight: bold;
      padding-top: 25px;
    }
    .strO {
      font-weight: bold;
      padding-top: 5px;
    }
    .tax {
      padding-top: 5px;
    }
    .addr {
      padding-top: 5px;
      text-transform: capitalize;
    }
    .phone {
      padding-top: 5px;
    }
    .stk {
      padding-top: 5px;
    }
    .nguoimua {
      padding-top: 5px;
      font-weight: bold;
      text-transform: capitalize;
    }
    .email {
      padding-top: 5px;
    }
    .note {
      padding-top: 5px;
      text-transform: capitalize;
    }
    .payment {
      padding-top: 5px;
    }
    .sig {
      padding-top: 50px;
      margin-left: 800px;
      font-weight: bold;
    }
    .note-sign {
      padding-top: 10px;
      margin-left: 790px;
      font-style: italic;
      font-size: 13px;
    }
  </style>
</head>
            <body onload="window.print();window.close()">${data}</body>
        </html>`);
  popupWin.document.close();
}
