const services = require("../services/user.service.js");


exports.signup=async(req,res,next)=>{
try{
const data = req.body;
const user = await services.userSingup(data);
res.status(200).json({message:"User Created"});
}catch(err){next(err);}
}

exports.signin=async(req,res,next)=>{
try{
const data = req.body;
const token =await services.userSignin(data);
res.status(200).json({message:"User Signedin",token});
}catch(err){
	next(err);}
}

//exports.googleSign=async()=>{}

exports.showTodo=async(req,res,next)=>{
try{
const data = req.user;
const todos = await services.getAll(data);
res.status(200).json({message:"Todos",todos});
}catch(err){

next(err);}
}

exports.newTodo=async(req,res,next)=>{
try{
const tododata=req.body;
const userdata=req.user;
const todo= await services.addTodo(tododata,userdata);
res.status(200).json({message:"Todo created",todo});
}catch(err){
next(err);}
}


exports.updateTodo=async(req,res,next)=>{
try{
const todoid= req.params.id;
const tododata = req.body;
const userdata = req.user;
const todo = await services.changeTodo(todoid,tododata,userdata);
res.status(200).json({message:"Todo Updated",todo});
}catch(err){next(err);}
}

exports.deleteTodo=async(req,res,next)=>{
try{
const userdata=req.user;
const todoid=req.params.id;
const todo = await services.removeTodo(todoid,userdata);
res.status(200).json({message:"Todo Deleted",todo});
}catch(err){next(err);}
}
