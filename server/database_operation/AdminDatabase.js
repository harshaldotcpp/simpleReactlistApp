const UserDatabase = require("./UserDatabase.js");
const md5 = require("md5");
const { Pool } = require("pg");

class AdminDatabase{
    
    #database;
    constructor(){
        this.#database = new Pool({
           user: process.env.DATABASE_USER,
           database:process.env.DATABASE,
           password: process.env.DB_PASSWORD,
           port: process.env.DB_PORT,
           host: process.env.DB_HOST
        });    
    }
  
     async createUser(name,password){
         await this.#database.query(
          `CREATE USER ${name} WITH PASSWORD '${password}';`
          );
    }

    async createUserDatabase(name,owner){
         await this.#database.query(
           `CREATE DATABASE ${name}
            OWNER ${owner};`
         );
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
         await  this.createUser(dbUsername,password);
         await this.createUserDatabase(dbUsername,dbUsername);
         const userDbCredential = await  this.getUserDbCredentials(id);
         const userDb = new  UserDatabase(userDbCredential);
         const tableName = "todos";
         const columns = ["todo VARCHAR(100) NOT NULL", "date VARCHAR(20) NOT NULL"];
         await userDb.createTable(tableName,columns);
         return id;;
    }

   async  getUserDbCredentials(id){
        const res = await this.#database.query(
          "select id, first_name,password from users where id = $1;",[id]
        );        
        const userDbCredential = {
            username: res.rows[0].first_name + res.rows[0].id,
            database: res.rows[0].first_name + res.rows[0].id,
            password: res.rows[0].password
        }
        return userDbCredential;
    }

    async getUserId(username){
        const res = await  this.#database.query(
            "select id from users where user_name = $1;",[username]
        );

        return res.rows[0].id;
    }

    async isUserPresent(username){
        const res = await  this.#database.query(
            "select * from users where user_name = $1",
            [username]
         );

        if(res.rows.length > 0)
            return true;
        
        return false;
    }

    async getPassword(username){
       const res = await this.#database.query(
          "SELECT password FROM users WHERE user_name = $1",
          [username]
        );
    
       return res.rows[0].password;
    }

    async passwordMatching(username,password){
        password = md5(password); 
        const ORIGNAL_PASSWORD = await this.getPassword(username);

        if(password !== ORIGNAL_PASSWORD)
            return false;
        return true;
           
    }
}




module.exports = AdminDatabase;
