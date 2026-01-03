import {AddTodoModel} from "../../components/addtodo.js";
import {TodoList} from "../../components/todolist.js";
import {addTodo}  from "../services/todo.js";
import {getTodo}  from "../services/todo.js";



export async function todoDashboard(){
const token = localStorage.getItem("Token");
if(!token){
alert("session expired. Please signin again.");
window.location.href="../../pages/signin.html";
return;
}
helper
//helper function 
function showMessage(todoRoot,message){
todoRoot.innerHTML=`
<div id="todomessage">${message}</div>
`;
}
//get all todo

const allTasks=document.getElementById("alltasks");
const completedTasks=document.getElementById("completed");
if(!completedTasks) return;
if(!allTasks) return;

async function loadAllTodo(){
allTasks.style.backgroundColor="blue";
allTasks.style.color="white";
const todoRoot = document.getElementById("todos");
if(!todoRoot){
return;
}

todoRoot.innerHTML="";
try{
const todos = await getTodo();
if(!Array.isArray(todos)){
alert("Please Signin again");
return;
}
if(todos.length === 0){
showMessage(todoRoot,"No Todo Created Yet");
return;
}
todos.forEach(todo=>{
todoRoot.appendChild(TodoList(todo));
});
}catch(err){
showMessage(todoRoot,"Error Loading Todos");
console.log(err);
}
}

async function loadCompletedTodo(){
const todoRoot = document.getElementById("todos");
if(!todoRoot){
return;
}

todoRoot.innerHTML="";
try{
const todos = await getTodo();
const completedTodos=todos.filter(todo=>todo.completed);
if(todos.length === 0){
showMessage(todoRoot,"No Todo Created Yet");
return;
}
todoRoot.innerHTML="";

completedTodos.forEach(todo=>{
todoRoot.appendChild(TodoList(todo));
}
);
}catch(err){
showMessage(todoRoot,"Error Loading Completed Todos");
console.log(err);
}
}


loadAllTodo();

completedTasks.addEventListener("click",()=>{
allTasks.style.backgroundColor="white";
allTasks.style.color="black";

completedTasks.style.backgroundColor="blue";
completedTasks.style.color="white";
loadCompletedTodo();
});

allTasks.addEventListener("click",()=>{
completedTasks.style.backgroundColor="white";
completedTasks.style.color="black";

allTasks.style.backgroundColor="blue";
allTasks.style.color="white";
loadAllTodo();
});


//adding todo
const btn=document.getElementById("createtodo");
if(!btn){
return;
}
btn.addEventListener("click",async()=>{
const modelRoot=document.getElementById("model-root");
const todoRoot = document.getElementById("todos");

const model = AddTodoModel(async(title)=>{
try{
const todo=await addTodo(title);
if(!todo){return;}
const todomsg=document.getElementById("todomessage");
if(todomsg)todomsg.remove();
todoRoot.appendChild(TodoList(todo));
}catch(err){
alert("todo not added");
console.log(err);
}
});
modelRoot.appendChild(model);
});


}
