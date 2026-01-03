import {Signup} from "./ui/signup.js";
import {Signin} from "./ui/signin.js";
import {todoDashboard} from "./ui/tododashboard.js";
document.addEventListener("DOMContentLoaded",()=>{
if(document.getElementById("signupbtn")){
Signup();
}
if(document.getElementById("signinbtn")){
Signin();
}
if(document.getElementById("todos")){
todoDashboard();
}
});
