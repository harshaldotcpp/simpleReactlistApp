const { Pool } = require('pg');


function getUserDb(data){
    const userDb = new Pool({
        user:data.userName,
        database:data.userName+"db",
        password:data.password,
        port:5432,
        host:"localhost"
    });

    return userDb;
}

module.exports = getUserDb;
