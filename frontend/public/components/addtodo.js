export function AddTodoModel(onadd){
const overlay=document.createElement("div");
overlay.className="model-overlay";

overlay.innerHTML=`
	<div class="addcontainer model">
			<div class="addinnercontainer">
				<div id="addhead">
				<p>Add New Todo</p>
				</div>
				<div id="intodo">
					<input type="text" id="todotext" placeholder="eg.Go to gym">
				</div>
				<div id="addtodo">
					<button type="button" id="addtodobtn">Add Todo</button>
				</div>
			</div>
		</div>

`;


overlay.querySelector("#addtodobtn").onclick=()=>{
const title=overlay.querySelector("#todotext").value;
onadd(title);
overlay.remove();

};
overlay.addEventListener("click",(e )=>{
if(e.target === overlay){
overlay.remove();
}

});


return overlay;

}

