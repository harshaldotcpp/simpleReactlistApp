const path = require("path");
require("dotenv").config();
const express = require("express");
const  app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth.js");


app.use(express.json());
app.use(express.static(path.join(__dirname,"../src")));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views",path.join(__dirname,"../public"));
app.set("view engine",'ejs');


app.get("/",auth,(req,res)=>{
    console.log("in root app.get");
   res.sendFile(path.join(__dirname,"../public/index.html"));
});


app.use("/signup",require(path.join(__dirname,"signin_signup/signup.js")));


app.use("/signin",require(path.join(__dirname,"signin_signup/signin.js")));
app.use("/api",require(path.join(__dirname,"api/gettodos.js")));
app.listen(8000,"0.0.0.0",()=>{
    console.log("runninng on 146.190.19.110:8000");
});

