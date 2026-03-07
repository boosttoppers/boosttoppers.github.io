/* ===== BANNER SLIDER ===== */

let slideIndex = 0;

window.onload = function () {
  showSlides();
  renderRecaptcha();
};

function showSlides() {

  let slides = document.getElementsByClassName("slides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000);
}


/* ===== LOGIN POPUP ===== */

function openLogin() {
  document.getElementById("loginPopup").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginPopup").style.display = "none";
}


/* ===== FIREBASE RECAPTCHA ===== */

function renderRecaptcha() {

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'normal'
    }
  );

  recaptchaVerifier.render();
}


/* ===== SEND OTP ===== */

function sendOTP(){

let mobile = "8081924678";

let number = "+91" + mobile;

firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)

.then(function(confirmationResult){

window.confirmationResult = confirmationResult;

alert("OTP Sent Successfully");

})

.catch(function(error){

alert(error.message);

});

}
/* ===== VERIFY OTP ===== */

function verifyOTP() {

  let code = "";

  let boxes = document.querySelectorAll(".otp-box");

  boxes.forEach((box) => {
    code += box.value;
  });

  if (code.length < 6) {
    alert("Enter complete OTP");
    return;
  }

  confirmationResult.confirm(code)

    .then(function () {

      alert("Login Successful");

      closeLogin();

    })

    .catch(function () {

      alert("Wrong OTP");

    });

}
var firebaseConfig = {
apiKey: "NEW_API_KEY",
authDomain: "boost-toppers.firebaseapp.com",
projectId: "boost-toppers",
storageBucket: "boost-toppers.firebasestorage.app",
messagingSenderId: "258617068875",
appId: "1:258617068875:web:XXXX"
};
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
'recaptcha-container',
{
size: 'normal'
}
);

recaptchaVerifier.render();
