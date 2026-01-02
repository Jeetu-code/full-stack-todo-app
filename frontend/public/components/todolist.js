import {updateTodo} from "../js/services/todo.js";
import {deleteTodo} from "../js/services/todo.js";
export function TodoList (todo){
const list = document.createElement("div");
list.dataset.id=todo._id;
list.innerHTML=`
<div class="containerlist" >
<div id="leftlistside">
<input type="checkbox" class="todo-check"  >
<div id="task">${todo.title}</div>
</div>
<div id="rightlistside">
<button type="button" class="deletetodo"><img src="../assets/delete.png"></button>
</div>
</div>
`;
const checkbox=list.querySelector(".todo-check");
checkbox.checked = todo.completed;
checkbox.addEventListener("change",async()=>{
const completed = checkbox.checked;
try{
const update = await updateTodo(todo._id,todo.title,completed);
}catch(err){
alert("Todo Not Udated");
console.log(err);
}
});
const deletebtn=list.querySelector(".deletetodo");
deletebtn.addEventListener("click",async()=>{
try{
const deletetodo = await deleteTodo(todo._id);
list.remove();
}catch(err){
alert("Todo Not Deleted");
console.log(err);
}
});
return list;

}
