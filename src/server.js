const express = require('express');;
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// Midlewares
console.log("******************")
app.use(morgan("dev"));
console.log("******************")
app.use(express.static(path.join(__dirname, 'public')))

// Config

app.set("port", process.env.PORT || 4000);
app.set('views', path.join(__dirname, '/public/'));
app.engine('html', require('ejs').__express);  
app.set('view engine', 'html');

app.get("/products/data", (req, res) => {
        const dataJson = JSON.parse(fs.readFileSync(path.join(__dirname, "database/productos.json")))
        res.json(dataJson)
})

app.get("/products/data/:nameCard", (req, res) => {
        const dataJson = JSON.parse(fs.readFileSync(path.join(__dirname, "database/productos.json")))
        let data = undefined;

        for (var i = 0; i < dataJson.length; i++) {
                if(dataJson[i].nameCard == req.params.nameCard.replace(/::/gi, " ")){
                        data = dataJson[i];
                }
        }

        if(data == undefined)
                res.json({
                        nameCard: "Undefined"
                })

        res.json(data)
})

app.get("/*", (req, res) => {
        res.render('index');
})


app.listen(app.get("port"), () => {
        console.log("listening on port " + app.get("port"))
})