console.log("linked contact js");

// let myForm = document.forms["contact-form"].getElementsByTagName("input");

let myForm = document.getElementById('contact-form');
let fullName = document.getElementById('contact-name');
let fullEmail = document.getElementById('contact-email');
let fullPhone = document.getElementById('contact-phone');
let select = document.getElementById('contact-select');

myForm.addEventListener('submit', function(e){
  e.preventDefault();
  makeArray();
});

let makeArray = () => {
  contactArray = [{fullName: fullName.value}, {email: fullEmail.value}, {phoneNumber: fullPhone.value}, {type: select.value}];
  console.log("contact", contactArray);
}
