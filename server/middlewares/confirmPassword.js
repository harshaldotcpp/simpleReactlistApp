const  checkIfMissing =  (body) => {
    if(!body.fname.length) return true;
    if(!body.userName.length) return true;
    if(!body.email.length) return true;
    if(body.password.length < 6) return true;
    if(bodyconfirmPassword.length < 6) return true;
    return false;
}


const confirmPassword = async (req,res,next) => {
   

     try{
        
         if(req.body.password !== req.body.confirmPassword){
             info.passwordMsg = "password doesnt match";
             throw "";
         }
         const missing = checkIfMissing(req.body);
         if(missing) 
             throw "";

        console.log(missing,"im heteeeeeeee");
         next();
     }
     catch(error){
    
         res.redirect(307,"/signup");;
     }
 };

 module.exports = { confirmPassword, checkIfMissing };
