const mongoose = require("mongoose")
const {mongo} = require("../config")

let connectionURL = `mongodb://${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}`;

if (mongo.dbUser && mongo.dbPass) {
    connectionURL = `mongodb://${mongo.dbUser}:${mongo.dbPass}@${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}`;
}

mongoose.connect(`mongodb://${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}`)
    .then(() => {
        console.log("Database connected");
    }).catch((e) => {
    console.log("Database error");
})
