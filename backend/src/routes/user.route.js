const express = require("express");
const router=express.Router();
const controller = require("../controllers/user.controller.js");
const auth=require("../middlewares/auth.js");
const {validate,signupschema,signinschema}=require("../validators/user.zod.js");

router.post("/signup",validate(signupschema),controller.signup);
router.post("/signin",validate(signinschema),controller.signin);
//router.post("/auth/google",OAuth,controller.googleSign);


router.get("/todo",auth,controller.showTodo);
router.post("/todo",auth,controller.newTodo);
router.put("/todo/:id",auth,controller.updateTodo);
router.delete("/todo/:id",auth,controller.deleteTodo);

module.exports=router;
