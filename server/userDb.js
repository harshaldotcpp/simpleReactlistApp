const { Pool } = require('pg');


function getUserDb(data,id){
    const userDb = new Pool({
        user:data.fname + id ,
        database:data.fname + id,
        password:data.password,
        port:5432,
        host:"localhost"
    });

    return userDb;
}

module.exports = getUserDb;
