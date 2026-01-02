const AppError = require("../utils/AppError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("../utils/bcrypt.js");

module.exports=async(req,res,next)=>{
try{
const tokenhead=req.headers.authorization;
if(!tokenhead || !tokenhead.startsWith("Bearer ")){
throw new AppError("Unauthorized",401);
}
const token = tokenhead.split(" ")[1];
const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user=decoded;
next();
}catch(err){
if(err.name === "JsonWebTokenError" || err.name === "TokenExpiredError"){
return next( new AppError("Unauthorized",401));
}
next(err);
}
}


