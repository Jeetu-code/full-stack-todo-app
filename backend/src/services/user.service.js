const User = require("../models/user.model.js");
const Todo=require("../models/todo.model.js");
const AppError = require("../utils/AppError.js");
const bcrypt = require("../utils/bcrypt.js");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");

exports.userSingup=async(data)=>{
const existingUserByEmail = await User.findOne({email:data.email});
if(existingUserByEmail){
throw new AppError("Email already exists ",409);
}
const existingUserByName = await User.findOne({name:data.name});
if(existingUserByName){
throw new AppError("User name already exists ",409);
}
const saltRound=10;
const hashedpassword =await bcrypt.hash(data.password,saltRound);
const user=await User.create({name:data.name,email:data.email,password:hashedpassword});
return user;

}


exports.userSignin=async(data)=>{
const user = await User.findOne({email:data.email});
if(!user){throw new AppError("User do not exists",401);}
else if(user.email !== data.email){
throw new AppError("Wrong Email",401);
}
const match = await bcrypt.compare(data.password,user.password);
if(!match){
throw new AppError("Wrong Password",401);}
const token = jwt.sign({userid:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"}); 
return token;

}

exports.getAll=async(userdata)=>{

const todo = await Todo.find({userId:userdata.userid});
if(!todo){
throw new AppError("No User Todos");
}
return	todo; 
}


exports.addTodo=async(tododata,userdata)=>{
if(!tododata.title || tododata.title === " "){
throw new AppError("Todo without title",400);
}
const todo = Todo.create({userId:userdata.userid,title:tododata.title,completed:tododata.completed});
if(!todo){
throw new AppError("todo not created",400);
}
return todo;
}


exports.changeTodo=async(todoid,tododata,userdata)=>{
if(!mongoose.Types.ObjectId.isValid(todoid)){
throw new AppError("Invalid Id",400);
}
const todo = await Todo.findOneAndUpdate({userId:userdata.userid,_id:todoid},{title:tododata.title,completed:tododata.completed},{new:true});
if(!todo  ){

throw new AppError("todo not found or forbidden",403);
}
return todo;
}

exports.removeTodo=async(todoid,userdata)=>{
if(!mongoose.Types.ObjectId.isValid(todoid)){
throw new AppError("Invalid Id",400);
}
const todo = await Todo.findByIdAndDelete({userId:userdata.userid,_id:todoid});
if(!todo){
throw new AppError("todo not found",404);
}
return todo;
}
