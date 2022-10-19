const Moongose = require("mongoose");

if(process.env.MONGODB_URI == undefined)
        process.env.MONGODB_URI = "mongodb://127.0.0.1/LluvisolCA"

Moongose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
})
        .then((res) => {
                console.log("Database is Connected");
        })