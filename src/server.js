require("dotenv").config()

const express = require('express');;
const path = require('path');
const morgan = require('morgan');
const database = require("./database/database");

const app = express();

database.connectToServer((err) => {
        if (err)
                console.error(err);
        else
                console.log("DB is conected")
})

// Midlewares
console.log("******************")
// app.use(morgan("dev"));
console.log("******************")
app.use(express.static(path.join(__dirname, 'public')))

// Config

app.set("port", process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/public/'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(require('./routes/products.routes'))

app.listen(app.get("port"), () => {
        console.log("listening on port " + app.get("port"))
})