const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'pokemon'
});

module.exports = conn;