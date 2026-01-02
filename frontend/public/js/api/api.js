const base_url = "https://full-stack-todo-app-backend-4l7k.onrender.com";

export async function apiRequest(endpoint,options={}){
const token = localStorage.getItem("Token");
const headers = {
	"Content-Type":"application/json",
	...options.headers,
}
if(token){
headers.Authorization=`Bearer ${token}`;
}

const response = await fetch(base_url+endpoint,{
	...options,
	headers,
});
if(!response){
const errorData=response.json();
throw new Error(errData);
}else{
return response.json();
}
}
