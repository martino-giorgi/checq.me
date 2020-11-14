// Database name
const DB_NAME = 'checqme'

// Database Password
const DB_PASS = 'URZ19FMeEbwGaMGU'

dbPassword = 'mongodb+srv://checqme:'+ encodeURIComponent(DB_PASS) + `@checqme.wynfg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
    mongoURI: dbPassword
};