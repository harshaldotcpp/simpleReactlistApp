const md5 = require("md5");
const jwt = require("jsonwebtoken");
const AdminDatabase = require("../database_operation/AdminDatabase.js");




const verifyUser = async ({username, password}) =>{
    const adminDb = new AdminDatabase();
    if(!await adminDb.isUserPresent(username))
        return Promise.resolve({
            verified: false,
            reason: "(invalid username)"
     });
    const passwordMatch = await adminDb.passwordMatching(username,password);
   
    if(!passwordMatch)
        return Promise.resolve({
            verified: false,
            reason: "(invalid password)"
         });

    const id = await adminDb.getUserId(username);
    return Promise.resolve({
        verified: true,
        userId: id
    });
};

module.exports  = verifyUser;
