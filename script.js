/* ===== BANNER SLIDER ===== */

let slideIndex = 0;

function showSlides(){

let slides = document.getElementsByClassName("slides");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex > slides.length){
slideIndex = 1;
}

if(slides.length > 0){
slides[slideIndex-1].style.display="block";
}

setTimeout(showSlides,3000);

}


/* ===== LOGIN POPUP ===== */

function openLogin(){
document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
document.getElementById("loginPopup").style.display="none";
}


/* ===== SIDE MENU ===== */

function openMenu(){
document.getElementById("sideMenu").style.left="0";
}

function closeMenu(){
document.getElementById("sideMenu").style.left="-100%";
}


/* ===== FIREBASE CONFIG ===== */

var firebaseConfig = {
apiKey: "AIzaSyASYLPq_X11qRmNcJdaSEcGQ49d5vnUhlk",
authDomain: "boost-toppers.firebaseapp.com",
projectId: "boost-toppers",
storageBucket: "boost-toppers.firebasestorage.app",
messagingSenderId: "258617068875",
appId: "1:258617068875:web:1d7d6c89840e2cef886cce"
};

firebase.initializeApp(firebaseConfig);


/* ===== PAGE LOAD ===== */

window.onload = function(){

showSlides();

renderRecaptcha();

};


/* ===== FIREBASE RECAPTCHA ===== */

function renderRecaptcha(){

if(!document.getElementById("recaptcha-container")) return;

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
"recaptcha-container",
{
size:"normal"
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

if(code.length < 6){
alert("Enter complete OTP");
return;
}

confirmationResult.confirm(code)

.then(function(){

alert("Login Successful");

closeLogin();

})

.catch(function(){

alert("Wrong OTP");

});

}

