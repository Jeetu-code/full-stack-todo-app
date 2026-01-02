const http = require("http");
const path = require("path");
const fs = require("fs");
const host = "localhost";
const port = 5500;

http.createServer((req,res)=>{
const url = req.url.split("?")[0];
let file = path.join(__dirname,"public",url);

if(url === "/"){
file = path.join(__dirname,"public","index.html");
}
if(fs.existsSync(file) && fs.statSync(file).isDirectory()){
file=path.join(file,"index.html");
}

const ext=path.extname(file);
let contentType = "text/html";

if(ext === ".css"){
contentType = "text/css";
}
else if(ext === ".js"){
contentType = "text/javascript";
}

fs.readFile(file,(error,content)=>{
if(error){
res.writeHead(400,{"Content-Type":"text/plain"});
res.end("File Not Found");
console.log(error);
}else{
res.writeHead(200,{"Content-Type":`${contentType}`});
res.end(content);
}
});

}).listen(port,host,()=>{
console.log(`frontend on http://${host}:${port}`);
});
