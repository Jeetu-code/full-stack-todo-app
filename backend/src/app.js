const express=require("express");
const app = express();
const cors = require("cors");
const route=require("./routes/user.route.js");
const globalerr=require("./middlewares/globalerr.js");
app.use(express.json());
app.use(cors({
	origin:"http://localhost:5500",
	methods:["POST","GET","PUT","DELETE"],
	allowedHeaders:["Content-Type","Authorization"],
	Credentials:true

}));
app.use("/user",route);
app.use(globalerr);
module.exports=app;
