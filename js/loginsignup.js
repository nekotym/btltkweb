const localAccounts = JSON.parse(localStorage.getItem("accounts"));
const localLogins = JSON.parse(localStorage.getItem("logins"));
/*signup */
var profile = document.querySelector(".profile");
var account = document.querySelector(".account");
if (JSON.parse(localStorage.getItem("logins")) != null) {
  localLogins.map((data) => {
    if (!data.user) {
    } else {
      profile.classList.add("on");
      account.classList.add("on");
    }
  });
}
function checkSignup() {
  /*tạo ra local storage để lưu các giá trị đăng ký*/
  // var name = document.forms["signupform"]["name"].value;
  // var address = document.forms["signupform"]["address"].value;
  // var phone = document.forms["signupform"]["number"].value;
  // var kiemTraDT = isNaN(phone);
  // var email = document.forms["signupform"]["email"].value;
  // var acong = email.indexOf("@");
  // var daucham = email.lastIndexOf(".");
  var user = document.forms["signupform"]["user"].value;
  var pass = document.forms["signupform"]["pass"].value;
  var repass = document.forms["signupform"]["repass"].value;
  let accounts = [];
  let account = {
    // name,
    // address,
    // email,
    // phone,
    user,
    pass,
    repass,
  };
  // if (name == "") {
  //   alert("Họ tên không được để trống");
  //   return false;
  // }
  // if (address == "") {
  //   alert("Địa chỉ không được để trống");
  //   return false;
  // }
  // if (email == "") {
  //   alert("Email không được để trống");
  //   return false;
  // } else if (acong < 1 || daucham < acong + 2 || daucham + 2 > email.length) {
  //   alert("Email không đúng định dạng");
  //   return false;
  // }
  // if (phone == "") {
  //   alert("Điện thoại không được để trống");
  //   return false;
  // }
  // if (phone.length != 10) {
  //   alert("Điện thoại định dạng 10 số");
  //   return false;
  // }
  // if (kiemTraDT == true) {
  //   alert("Điện thoại phải ở định dạng số");
  //   return false;
  // }
  if (user == "") {
    alert("Tài khoản không được để trống");
    return false;
  }
  if (pass == "") {
    alert("Mật khẩu không được để trống");
    return false;
  }
  if (repass == "") {
    alert("Xác nhận mật khẩu không được để trống");
    return false;
  }
  if (pass != repass) {
    alert("Mật khẩu và Xác nhận mật khẩu không được khác nhau");
    return false;
  }
  if (JSON.parse(localStorage.getItem("accounts")) === null) {
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    window.location = "../html/login.html";
  } else {
    localStorage.removeItem("accounts");
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    window.location = "../html/login.html";
  }
}
/*login*/
function checklogin() {
  var user = document.forms["loginform"]["user"].value;
  var pass = document.forms["loginform"]["pass"].value;
  let logins = [];
  let login = {
    user: user,
    pass: pass,
  };
  if (JSON.parse(localStorage.getItem("accounts")) === null) {
    alert("Please Sign Up");
  } else {
    localAccounts.map((data) => {
      if (user == "" && pass == "") {
        alert("Tài khoản mật khẩu không được để trống");
      } else if (user == "" || pass == "") {
        alert("Tài khoản hoặc mật khẩu không được để trống");
      } else if (user == data.user && pass == data.pass) {
        if (JSON.parse(localStorage.getItem("logins")) === null) {
          logins.push(login);
          localStorage.setItem("logins", JSON.stringify(logins));
          window.location = "../html/login.html";
        }
        alert("Coupon: FA-50%");
        window.location = "../html/shop.html";
      } else if (user == data.user && pass != data.pass) {
        alert("Password is not correct. Please try again !");
      } else {
        alert("User invalid. Please sign up and try again !");
      }
    });
  }
}
/*day la update user*/
const userId = document.querySelector("#user-name");
const IdBoxTable = userId.querySelector("table");
console.log(IdBoxTable);
let table = ``;
if (JSON.parse(localStorage.getItem("accounts")) != null) {
  JSON.parse(localStorage.getItem("accounts")).map((data) => {
    table += `    <tbody>
    <tr>
      <td rowspan="11">
        <div class="pro5">
          <img class="border" src="imgpro/border.png" alt="" />
          <div class="box"></div>
          <img class="img" src="imgpro/meonhaMei.jpg" alt="" />
        </div>
      </td>
    </tr>
    <tr>
      <td class="trName">Name</td>
    </tr>
    <tr>
      <td class="tdName">${data.name}</td>
      <td class="edit" onclick="edit()"><i class="fas fa-edit"></i></td>
    </tr>
    <tr>
      <td class="trUser">User</td>
    </tr>
    <tr>
      <td class="tdUser">${data.user}</td>
      <td class="edit"><i class="fas fa-edit"></i></td>
    </tr>
    <tr>
      <td class="trEmail">Email</td>
    </tr>
    <tr>
      <td class="tdEmail">${data.email}</td>
      <td class="edit"><i class="fas fa-edit"></i></td>
    </tr>
    <tr>
      <td class="trPhone">Phone</td>
    </tr>
    <tr>
      <td class="tdPhone">${data.phone}</td>
      <td class="edit"><i class="fas fa-edit"></i></td>
    </tr>
    <tr>
      <td class="trAddress">Address</td>
    </tr>
    <tr>
      <td class="tdAddress">${data.address}</td>
      <td class="edit"><i class="fas fa-edit"></i></td>
    </tr>
  </tbody>`;
  });
}
IdBoxTable.innerHTML = table;

/*day la logout*/
function logout() {
  window.location = "../html/login.html";
  localStorage.removeItem("logins");
  localStorage.removeItem("items");
}
