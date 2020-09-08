let _ = require('dotenv').config(),
    database = require('./config/database'),
    express = require('./config/express'),
    db = database(),
    app = express();
let server = app.listen(process.env.PORT);
module.exports = app;
console.log(`Server is running at http://localhost:${process.env.PORT}/`);
db.catch(error => {
    server.close();
    console.log(error);
});