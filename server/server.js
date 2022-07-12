const express = require("express");
const  app = express();
const path = require("path");
const bodyParser = require("body-parser");



app.use(express.static(path.join(__dirname,"../src")));
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../login.html"));
    console.log(path.join(__dirname));
});

app.get("/systemjs.config.js",(req,res) =>{
    res.sendFile(path.join(__dirname,"../systemjs.config.js"));
});

app.use("/signup",require(path.join(__dirname,"routes/signup.js")));



app.listen(8000,"0.0.0.0",()=>{
    console.log("runninng on 146.190.19.110:8000");
});

