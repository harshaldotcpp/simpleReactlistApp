const express = require("express");
const  app = express();
const path = require("path");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");


const oneDay = 100 * 60 *  60 * 24;
app.use(sessions({
    secret:"bsbsbsbsbsjznsjs",
    saveUninitialized:true,
    resave: false
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(express.static(path.join(__dirname,"../src")));
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/",(req,res)=>{
   
        res.sendFile(path.join(__dirname,"../login.html"));
   
});

app.get("/systemjs.config.js",(req,res) =>{
    res.sendFile(path.join(__dirname,"../systemjs.config.js"));
});

app.use("/signup",require(path.join(__dirname,"routes/signup.js")));



app.listen(8000,"0.0.0.0",()=>{
    console.log("runninng on 146.190.19.110:8000");
});

