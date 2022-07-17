const  checkIfMissing =  (body) => {
    if(!body.fname.length) return true;
    if(!body.userName.length) return true;
    if(!body.email.length) return true;
    if(body.password.length < 6) return 
    return false;
}


const confirmPassword = async (req,res,next) => {
   

     try{
        
         if(req.body.password !== req.body.confirmPassword){
             throw "";
         }
         const missing = checkIfMissing(req.body);
         if(missing) 
             throw "";

        console.log(missing,"im heteeeeeeee");
         next();
     }
     catch(error){
         console.log(error);
         res.redirect(307,"/signup");;
     }
 };

 module.exports = confirmPassword;
