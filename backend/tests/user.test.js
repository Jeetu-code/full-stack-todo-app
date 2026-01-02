const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
let app;
let todoid;
let token;
beforeAll(async()=>{
app=require("../src/app.js");
});
/*
describe("A. Authentication Tests",()=>{

test("Signup successfully",async()=>{
const res = await request(app)
	.post("/user/signup")
	.send({
	name:"testuser",
	email:"testuser@gmail.com",
	password:"123456",
	});
	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty("message");

});

test("Signup with existing user name",async()=>{
//creating existing user name 
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser1@gmail.com",
		password:"123456",
	});

//creating new user with existing email
const res =await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser2@gmail.com",
		password:"123456",
	});
	expect(res.statusCode).toBe(409);
	expect(res.body).toHaveProperty("message");
});

test("Signup with existing email",async()=>{
//creating existing email
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser1",
		email:"testuser@gmail.com",
		password:"123456",
	});

//creating new user with existing email
const res =await request(app)
	.post("/user/signup")
	.send({
		name:"testuser2",
		email:"testuser@gmail.com",
		password:"123456",
	});
	expect(res.statusCode).toBe(409);
	expect(res.body).toHaveProperty("message");
});

test("signup invalid  weak password",async()=>{
const res=await request(app)
	.post("/user/signup")
	.send({
	name:"testuser",
	email:"testuser@email.com",
	password:"12345",
	});

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty("message");
});


test("signup invalid  email",async()=>{
const res=await request(app)
	.post("/user/signup")
	.send({
	name:"testuser",
	email:"testuser2131email...com",
	password:"123456",
	});

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty("message");
});

test("Signin successfully",async()=>{
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const res = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});

	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty("message");
});

test("Signin before signup unsuccessfull",async()=>{
const res =await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@email.com",
		password:"123456",
	});

	expect(res.statusCode).toBe(401);
	expect(res.body).toHaveProperty("message");
});

test("user signin wrong password  ",async()=>{
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"123456",
	});

const res = await request(app)
	.post("/user/signin")
	.send({ 
	email:"testuser@gmail.com",
	password:"123457",
	});
	expect(res.statusCode).toBe(401);
	expect(res.body).toHaveProperty("message");

});


test("user signin wrong email  ",async()=>{
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"123456",
	});

const res = await request(app)
	.post("/user/signin")
	.send({ 
	email:"testusers@gmail.com",
	password:"123456",
	});
	expect(res.statusCode).toBe(401);
	expect(res.body).toHaveProperty("message");

});

test("user signin invalid password or email from zod",async()=>{
const res = await request(app)
	.post("/user/signin")
	.send({
		email:"test.gmail..com",
		password:"34343",
	});
	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty("message");
});

});


describe("Authorization/token tests",()=>{
describe("Missing/invalid token",()=>{

test("No Authorization header",async()=>{
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
const resauth = await request(app)
	.get("/user/todo");

	expect(resauth.statusCode).toBe(401);
	expect(resauth.body).toHaveProperty("message");
});

test("Bearer Missing",async()=>{
let authtoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
	authtoken = restoken.body.token;
const resauth = await request(app)
	.get("/user/todo")
	.set("Authorization",`${token}`);

	expect(resauth.statusCode).toBe(401);
	expect(resauth.body).toHaveProperty("message");
});


test("Invalid Jwt",async()=>{
let authtoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
	authtoken = restoken.body.token;
const resauth = await request(app)
	.get("/user/todo")
	.set("Authorization",`${token}+1`);

	expect(resauth.statusCode).toBe(401);
	expect(resauth.body).toHaveProperty("message");
});


test("Expired Jwt",async()=>{

const expiredtoken = jwt.sign({userId: new mongoose.Types.ObjectId()},process.env.JWT_SECRET,{expiresIn:"-1s"});
const resauth = await request(app)
	.get("/user/todo")
	.set("Authorization",`Bearer ${expiredtoken}`);

	expect(resauth.statusCode).toBe(401);
	expect(resauth.body).toHaveProperty("message");
});
});

describe("Cross-user Access",()=>{

test("Token of user B accessing User A data unsuccessful",async()=>{
//creating user A and one todo data
let userAtoken;
let userAtodoid;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
	userAtoken = restoken.body.token;
const restodo = await request(app)
	.post("/user/todo")
	.set("Authorization",`Bearer ${userAtoken}`)
	.send({
		title:"gaming",
		completed:false,
	});
	userAtodoid = restodo.body.todo._id;
//creating user B and accessing user A data
let userBtoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restokenB = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	userBtoken = restokenB.body.token;

const res = await request(app)
	.put(`/user/todo/${userAtodoid}`)
	.set("Authorization",`Bearer ${userBtoken}`)
	.send({
		completed:true,
	});
	expect([404,403]).toContain(res.statusCode);
	expect(res.body).toHaveProperty("message");

});

});
});
*/






/*
describe("Todo CRUD-success path",()=>{

test("Adding todo successful",async()=>{
let usertoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		title:"gaming",
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);

	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty("todo");

});

test("Get empty todo",async()=>{
let usertoken;

await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"123456",
	});

const gettoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"123456",
	});
	usertoken = gettoken.body.token;
const gettodos = await request(app)
	.get("/user/todo")
	.set("Authorization",`Bearer ${usertoken}`);
	
	expect(gettodos.statusCode).toBe(200);
	expect(gettodos.body).toHaveProperty("todos");
});

test("Get All todo successful",async()=>{
let usertoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		title:"gaming",
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);


const resget = await request(app)
	.get("/user/todo")
	.set("Authorization",`Bearer ${usertoken}`);
	expect(resget.statusCode).toBe(200);
	expect(resget.body).toHaveProperty("todos");

});
test("Update todo successful",async()=>{
let usertoken;
let usertodoid;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;
const restodo = await request(app)
	.post("/user/todo")
	.set("Authorization",`Bearer ${usertoken}`)
	.send({
		title:"gaming",
		completed:false,
	});
	usertodoid = restodo.body.todo._id;
const res = await request(app)
	.put(`/user/todo/${usertodoid}`)
	.set("Authorization",`Bearer ${usertoken}`)
	.send({
		title:"gaming",
		completed:true,
	});
	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty("todo");
});

test("Delete todo successful",async()=>{
let usertoken;
let usertodoid;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuser",
		email:"testuser@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuser@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;
const restodo = await request(app)
	.post("/user/todo")
	.set("Authorization",`Bearer ${usertoken}`)
	.send({
		title:"gaming",
		completed:false,
	});
	usertodoid = restodo.body.todo._id;
const res=await request(app)
	.delete(`/user/todo/${usertodoid}`)
	.set("Authorization",`Bearer ${usertoken}`)
	expect(res.statusCode).toBe(200);
	expect(res.body).toHaveProperty("message");
});

});

*/

describe("Todo validation Test",()=>{

test("create todo without title unsuccessful",async()=>{
let usertoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty("message");
});


test("create todo with empty title unsuccessful",async()=>{
let usertoken;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		title:" ",
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);

	expect(res.statusCode).toBe(400);
	expect(res.body).toHaveProperty("message");


});

test("Update todo with invalid id unsuccessful",async()=>{
let usertoken;
let todoid;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		title:"gaming ",
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);
	todoid = res.body.todo._id;	

const updatedres = await request(app)
	.put(`/user/todo/${todoid+1}`)
	.set("Authorization",`Bearer ${usertoken}`)
	.send({
		title:"gaming",
		completed:true,
	});
	expect(updatedres.statusCode).toBe(400);
	expect(updatedres.body).toHaveProperty("message");
	



});


test("Delete todo with invalid id unsuccessful",async()=>{
let usertoken;
let todoid;
await request(app)
	.post("/user/signup")
	.send({
		name:"testuserB",
		email:"testuserB@gmail.com",
		password:"843992",
	});
const restoken = await request(app)
	.post("/user/signin")
	.send({
		email:"testuserB@gmail.com",
		password:"843992",
	});
	usertoken = restoken.body.token;

const res=await request(app)
	.post("/user/todo")
	.send({
		title:"gaming ",
		completed:false,
	})
	.set("Authorization",`Bearer ${usertoken}`);
	todoid = res.body.todo._id;	

const deleteres = await request(app)
	.put(`/user/todo/${todoid+1}`)
	.set("Authorization",`Bearer ${usertoken}`);

	expect(deleteres.statusCode).toBe(400);
	expect(deleteres.body).toHaveProperty("message");
});


});



