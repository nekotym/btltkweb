function sendContact() {
  var params = {
    name: document.getElementById("your-name").value,
    email: document.getElementById("your-email").value,
    message: document.getElementById("your-message").value,
  };
  const serviceID = "service_sspwcum";
  const templateID = "template_yzbm938";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("your-name").value = "";
      document.getElementById("your-email").value = "";
      document.getElementById("your-message").value = "";
      console.log(res);
      alert("Your message sent successfully");
    })
    .catch((err) => console.log(err));
}
