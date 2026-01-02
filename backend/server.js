require("./jest.setup.js");
const app = require("./src/app.js");
const port = process.env.PORT;
const db=require("./src/configs/db.js");

db();
app.listen(port,()=>{
console.log(`backend running on port ${port}`);
});



