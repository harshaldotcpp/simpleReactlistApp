const  someValueMissing  =  (body) => {
    if(!body.fname.length) return true;
    if(!body.userName.length) return true;
    if(!body.email.length) return true;
    if(body.password.length < 6) return true; 
    return false;;
}

const passwordMatch = (password,confirmPassword) =>{
    return password === confirmPassword;
}


const checkSignUpValues  = async (req,res,next) => {
   

     try{
        
         if(!passwordMatch(req.body.password,req.body.confirmPassword))
             throw "PASSWORD_ERROR";
       
         if(someValueMissing(req.body))
             throw "ERROR";

         next();
     }
     catch(error){
         console.log(error);
         res.redirect(307,"/signup");;
     }
 };

 module.exports = checkSignUpValues;
