import mysql from 'mysql2/promise';
const connection=await  mysql.createConnection({
    host: 'localhost',
    user:process.env.DB_User,
    password:process.env.DB_Password,
    database:process.env.DB_DATABASE
});
export default connection;
