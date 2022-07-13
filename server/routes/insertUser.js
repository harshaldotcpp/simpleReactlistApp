const database = require("../adminDb.js");
const getUserdb  = require("./userDb.js");


async function createUser(body){
  
    const res =  await  database.query(
           `CREATE USER ${body.userName}
            WITH PASSWORD '${body.password}' ;`
        );
    return res;
}

function createTable(tableName,columns,userdb){
      userdb.query(
         `CREATE TABLE
          ${tableName}(
             ${columns[0]},
             ${columns[1]} 
         );`
      );
}


async function addUserCredential(body){
     await database.query(
           `INSERT INTO
            users(name,user_name,email,password)
            VALUES($1,$2,$3,$4);`,
            [body.fname,
            body.userName,
            body.email,
            body.password] 
     );
};




async function createDatabase(name){
  const res = await  database.query(
       `CREATE DATABASE ${name+"db"}
        OWNER ${name} ; `
    );
  console.log(res);
}




async function signUp(body){
    try{
        const res = await  addUserCredential(body);
        console.log(res);
   }
    catch(error){
        console.log(error);
        return;
    }

    try{
      await createUser(body);
      await createDatabase(body.userName);;
   
      const userdb = getUserdb(body);
      const columns = ["todo VARCHAR(100) NOT NULL",
        "date DATE NOT NULL"];
  
     await createTable("todos",columns,userdb);
   }
    catch(error){
        console.log("createUser");
        
        return;
    };
}


module.exports = signUp;
