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

function sendOTP() {

  let mobile = document.getElementById("mobile").value.trim();

  if (mobile.length !== 10) {
    alert("Enter valid mobile number");
    return;
  }

  let phoneNumber = "+91" + mobile;

  firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)

    .then(function (confirmationResult) {

      window.confirmationResult = confirmationResult;

      alert("OTP Sent Successfully");

    })

    .catch(function (error) {

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
