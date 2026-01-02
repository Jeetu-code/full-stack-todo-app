const mongoose = require("mongoose");

const connection = async()=>{
try{
if(process.env.NODE_ENV==="test")return;
await mongoose.connect(process.env.MONGO_URI);
console.log("Database connected successfully");

}catch(err){
console.error("Database connectionfailed",err);
process.exit(1);
}
}

module.exports=connection;
