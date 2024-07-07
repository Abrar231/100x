// require('dotenv').config();
// console.log(JSON.stringify(process.env));
module.exports = {
    env: process.env.NODE_ENV,
    serverPort: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    corsOrigin: process.env.CORS_ORIGIN,
}