import {apiRequest} from "../api/api.js";

export async function userSignup(name,email,password){
try{
const data = await apiRequest("/user/signup",{
	method:"POST",
	body:JSON.stringify({name,email,password}),

});


}catch(err){
throw err;
}
}

export async function userSignin(email,password){
try{
const data = await apiRequest("/user/signin",{
	method:"POST",
	body:JSON.stringify({email,password}),
});
localStorage.setItem("Token",data.token);
}catch(err){
throw err;
}

}




