let slideIndex = 0;

window.onload = function(){
showSlides();
}

/* ===== BANNER SLIDER ===== */

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


/* ===== OTP LOGIN SYSTEM ===== */

let generatedOTP = "";

function sendOTP(){

let mobile = document.getElementById("mobile").value;

if(mobile.length != 10){
alert("Enter valid mobile number");
return;
}

generatedOTP = Math.floor(100000 + Math.random() * 900000);

alert("Your OTP is: " + generatedOTP);
}

function verifyOTP(){

let otp = document.getElementById("otp").value;

if(otp == generatedOTP){

alert("Login Successful");
closeLogin();

}else{

alert("Wrong OTP");

}

}
