require('dotenv').config();

// Database name
const DB_NAME = process.env.DB_NAME

// Database Password
const DB_PASS = process.env.DB_PASS

dbPassword = 'mongodb+srv://checqme:'+ encodeURIComponent(DB_PASS) + `@checqme.wynfg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
    mongoURI: dbPassword
};

console.log('Now the value for DB_NAME is:', DB_NAME);
console.log('Now the value for DB_PASS is:', DB_PASS);
