//module/packages
const mysql = require('mysql2/promise');
require('dotenv').config();

//connection details
const dbConfig ={
    host: process.env.LOCAL_HOST,
    user: process.env.YOUR_MYSQL_USER,
    password: process.env.YOUR_MYSQL_PASSWORD,
    database: process.env.YOUR_MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

//connector const
const pool = mysql.createPool(dbConfig)

//export
module.exports = pool;