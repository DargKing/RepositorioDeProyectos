const { MongoClient } = require('mongodb');

if (process.env.MONGODB_URI == undefined)
        process.env.MONGODB_URI = "mongodb://localhost/27017"

const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

let dbConnection;

module.exports = {
        connectDatabase: function (callback) {
                client.connect(function (err, db) {
                        if (err || !db)
                                return callback(err);

                        dbConnection = db.db("LluvisolCA");
                        return callback()
                })
        },
        getDB: function () {
                return dbConnection
        }
}