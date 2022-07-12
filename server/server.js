const express = require("express");
const  app = express();
const path = require("path");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../index.html"));
    console.log(path.join(__dirname));
});

app.get("/systemjs.config.js",(req,res) =>{
    res.sendFile(path.join(__dirname,"../systemjs.config.js"));
});

app.use(express.static(path.join(__dirname,"../src")));

app.listen(8000,"0.0.0.0",()=>{
    console.log("runninng on 146.190.19.110:8000");
});

