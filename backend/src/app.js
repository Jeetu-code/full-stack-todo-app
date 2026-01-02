const express=require("express");
const app = express();
const cors = require("cors");
const route=require("./routes/user.route.js");
const globalerr=require("./middlewares/globalerr.js");
app.use(express.json());
app.use(cors({
	origin:"https://full-stack-todo-hyphrx6ps-jitender-kumars-projects-30f764e5.vercel.app",
	methods:["POST","GET","PUT","DELETE"],
	allowedHeaders:["Content-Type","Authorization"],
	credentials:true

}));
app.use("/user",route);
app.use(globalerr);
module.exports=app;
