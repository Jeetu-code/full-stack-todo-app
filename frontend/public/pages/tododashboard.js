import {AddTodoModel} from "../components/addtodo.js";
import {TodoList} from "../components/todolist.js";

const btn=document.getElementById("createtodo");
const modelRoot=document.getElementById("model-root");
const todo = document.getElementById("todos");
btn.addEventListener("click",()=>{
const model = AddTodoModel((title)=>{
todo.appendChild(TodoList(title));
});
modelRoot.appendChild(model);

});
