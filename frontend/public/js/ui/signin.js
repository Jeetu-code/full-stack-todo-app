import {userSignin} from "../services/auth.js";

export async function Signin(){
const signinbtn=document.getElementById("signinbtn");
if(!signinbtn){
return;
}

signinbtn.addEventListener("click",async()=>{
const email=document.getElementById("useremail").value;
const password=document.getElementById("userpassword").value;
try{
const token = await userSignin(email,password);
if(!token){
alert("Signin failed , token not received.");
return;
}
window.location.href="../../pages/tododashboard.html";
alert("Signin Successful");
}catch(err){
alert("Signin Unsuccessful");
console.log(err);
}
});
}
