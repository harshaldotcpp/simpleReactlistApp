 const confirmPassword = async (req,res,next) => {
     try{
        
         if(req.body.password !== req.body.confirmPassword)
             throw "password doesnt match"
         next();
     }
     catch(error){
         res.send(error);
     }
 };

 module.exports = confirmPassword;
