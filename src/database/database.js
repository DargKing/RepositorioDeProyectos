const { MongoClient } = require('mongodb')

if (process.env.MONGODB_URI == undefined) {
        process.env.MONGODB_URI = "mongodb://localhost/27017"
}

const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})

let dbConection;

module.exports = {
        connectToServer: function (callback) {
                const func = () => {
                        client.connect(function (err, db) {
                                if (err || !db) {
                                        return callback(err, func)
                                }

                                dbConection = db.db("LluvisolCA")
                                return callback()
                        })
                }
                func()
        },
        getDB: function () {
                return dbConection
        }
}