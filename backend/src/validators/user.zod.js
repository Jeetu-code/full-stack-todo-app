const z = require("zod");

const signupschema =z.object({
	name:z.string(),
	email:z.string().email(),
	password:z.string().min(6)
});
const signinschema =z.object({
	email:z.string().email(),
	password:z.string().min(6)
});


const validate=(schema)=>(req,res,next)=>{
try{
schema.parse(req.body);
next();
}catch(err){
//console.log(err,"herrrrrrreeeeeeeee");
res.status(400).json({message:"Invalid email or password"},err.errors)}
}
module.exports={validate,signupschema,signinschema};
