require("dotenv").config();
class AdminDatabase{
    
    #database;
    constructor(){
        this.#database = require("../adminDb.js");
    
    }
  
    createUser(name,password){
        this.#database.query(
          `CREATE USER ${name} WITH PASSWORD '${password}';`
          );
    }

    createUserDatabase(name,owner){
        this.#database.query(
           `CREATE DATABASE ${name}
            OWNER ${owner};`
         );
    }

    getUserDbCredentials(id){
        
    }

    addUser = async (user) => {
         const res =  await this.#database.query(
              `INSERT INTO
               users(first_name, last_name,user_name,email,password)
               VALUES($1,$2,$3,$4,$5)RETURNING id,first_name,password;`,
               [user.fname, user.lname,user.userName,user.email,user.password]
          ); 
         const {id,first_name,password} = res.rows[0];
         const dbUsername = first_name + id;
         this.createUser(dbUsername,password);
         this.createUserDatabase(dbUsername,dbUsername);

         return id;
    }   
}


const adminDb = new AdminDatabase();
adminDb.addUser(obj);

