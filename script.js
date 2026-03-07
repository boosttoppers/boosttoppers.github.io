/* ===== BANNER SLIDER ===== */

let slideIndex = 0;

window.onload = function(){
showSlides();
renderRecaptcha();
};

function showSlides(){

let slides = document.getElementsByClassName("slides");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex > slides.length){
slideIndex = 1;
}

slides[slideIndex-1].style.display = "block";

setTimeout(showSlides,3000);

}


/* ===== LOGIN POPUP ===== */

function openLogin(){
document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
document.getElementById("loginPopup").style.display="none";
}


/* ===== FIREBASE REAL OTP SYSTEM ===== */

function renderRecaptcha(){

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
'recaptcha-container',
{
size:'normal'
}
);

recaptchaVerifier.render();

}


/* ===== SEND OTP ===== */

function sendOTP(){

let mobile = document.getElementById("mobile").value;

if(mobile.length != 10){
alert("Enter valid mobile number");
return;
}

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

function verifyOTP(){

let code = "";

document.querySelectorAll(".otp-box").forEach((box)=>{
code += box.value;
});

confirmationResult.confirm(code)

.then(function(){

alert("Login Successful");
closeLogin();

})

.catch(function(){

alert("Wrong OTP");

});

}
