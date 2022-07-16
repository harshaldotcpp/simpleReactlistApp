const database = require("../adminDb.js");
const md5 = require("md5");
const jwt = require("jsonwebtoken");



const getUserInfo = async(username) => {
     const res = await database.query(
         `SELECT * FROM users WHERE user_name = $1;`,
         [username]
   );
   return res.rows;
}


const verifyUsername = async (username)=>{
   
   const rows = await getUserInfo(username);
  
   if(rows.length > 0)
       return true;
   else
       return false;
            
}


const verifyPassword = async (password,username)=>{
    password = md5(password);
    const rows = await  getUserInfo(username);
    const userInfo = rows[0];
    const orignalPassword = userInfo.password;
    if(password === orignalPassword)
        return true;
    return false;
}




const verifyUser = async ({username, password}) =>{
    const usernameMatch =  await  verifyUsername(username)
    if(!usernameMatch)
        return Promise.resolve({
            verified: false,
            reason: "Account with this username not exits"
     });
 
    const passwordMatch = await verifyPassword(password,username);

    if(!passwordMatch)
        return Promise.resolve({
            verified: false,
            reason: "invalid password"
         });

    const rows = await  getUserInfo(username);
    const userInfo = rows[0];
    return Promise.resolve({
        verified: true,
        userId: userInfo.id
    });
};

module.exports  = verifyUser;
