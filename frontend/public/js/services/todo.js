import {apiRequest} from "../api/api.js";

export async function addTodo(title){
try{
const data = await apiRequest("/user/todo",{
	method:"POST",
	body:JSON.stringify({title}),
});
return data.todo;

}catch(err){throw err}
}

export async function getTodo(){
try{
const data=await apiRequest("/user/todo",{
	method:"GET",
});
return data.todos;
}catch(err){throw err}
}

export async function updateTodo(todoId,title,completed){
try{
const data = await apiRequest(`/user/todo/${todoId}`,{
	method:"PUT",
	body:JSON.stringify({title,completed}),

});
}catch(err){throw err}
}

export async function deleteTodo(todoId){
try{
const data = await apiRequest(`/user/todo/${todoId}`,{
	method:"DELETE",
});
}catch(err){
throw err;
}
}
