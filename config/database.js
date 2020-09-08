let mongoose = require('mongoose'),
    { exec } = require('child_process');
    
const DEVELOPMENT = process.env.NODE_ENV == 'development' || typeof process.env.NODE_ENV == "undefined";

if (DEVELOPMENT) {
    console.log("Starting MongoDB...");
    exec("mongod --smallfiles");
}

module.exports = function() {
    let db = mongoose.connect(//DEVELOPMENT ? 
            // 'mongodb://localhost/mongodb' :
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_URL}?retryWrites=true`, { useNewUrlParser: true });
    require('../app/models/project.server.model');
    require('../app/models/user.server.model');
    return db;
};
