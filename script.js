let slideIndex = 0;

window.onload = function(){
showSlides();
}

function showSlides(){

let slides = document.getElementsByClassName("slides");
let dots = document.getElementsByClassName("dot");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex>slides.length){
slideIndex=1;
}

slides[slideIndex-1].style.display="block";

for(let i=0;i<dots.length;i++){
dots[i].classList.remove("active");
}

dots[slideIndex-1].classList.add("active");

setTimeout(showSlides,3000);
}

function openLogin(){
document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
document.getElementById("loginPopup").style.display="none";
}
let slideIndex = 0;
showSlides();

function showSlides(){

let slides = document.getElementsByClassName("slides");
let dots = document.getElementsByClassName("dot");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex>slides.length){
slideIndex=1;
}

slides[slideIndex-1].style.display="block";

setTimeout(showSlides,3000);
}

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

generatedOTP = Math.floor(1000 + Math.random()*9000);

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
