import {userSignup} from "../services/auth.js";

export async function Signup(){
const signupbtn = document.getElementById("signupbtn");
if(!signupbtn){
return;
}
signupbtn.addEventListener("click",async()=>{
const name = document.getElementById("username").value;
const email = document.getElementById("useremail").value;
const password = document.getElementById("userpassword").value;

try{
await userSignup(name,email,password);
alert("Signup Successful");

}catch(err){
alert("Signup Unsuccessful");
console.log(err);
}});
}
