const md5 = require("md5");
const jsw = require("jsonwebtoken");
const AdminDatabase  = require("../database_operation/AdminDatabase.js");



async function  getWebToken(userId){
    
    return await jsw.sign({id:userId},process.env.SECRET_KEY);
}

const encryptPassword = password => md5(password);




const lowerCaseUserCredentials = (body) =>{
     body.fname = body.fname.toLowerCase().trim();
     body.email = body.email.toLowerCase().trim();
     body.lname = body.lname.toLowerCase().trim(); 
}

/*

 main signup function

*/


async function signUp(body){
   try{

     const adminDb = new AdminDatabase();
     body.password = encryptPassword(body.password);
     lowerCaseUserCredentials(body);
     const id = await adminDb.addUser(body);
     
     console.log("added user in database  succesfully");
     return Promise.resolve("succesfull");
    }
    catch(error){
        console.log(error);
        if(error.constraint === "users_user_name_key")
          return Promise.reject("username taken");
       if(error.constraint === "users_email_key")
           return Promise.reject("account already exist");
      return promise.reject("error");
    }
}


module.exports = signUp;
