
module.exports=(err,req,res,next)=>{
console.log(err.message);
res.status(err.statuscode||500).json({message:err.message||"Internal server Error",});
};
