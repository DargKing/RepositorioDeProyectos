const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const DataBase = require('../database/database');

const db = new DataBase();

db.connectDatabase((err) => {
        if (err)
                console.error(err);
        else
                console.log("DB isconected")
})

Route.get("/products/data/modalImg/:id", async (req, res) => {
        const imageCollection = db.GetDB().collection("images")

        const data = await imageCollection.findOne({ _id: new ObjectId(req.params.id) })

        if (data == null) {
                res.sendStatus(404)
                return;
        }

        const buffer = Buffer.from(data.buffer, "base64")

        res.writeHead(200, {
                "Content-Type": data.mimetype,
                "Content-Length": data.size,
        })
        setTimeout(() => res.end(buffer), 100)
})

Route.get("/products/data", async (req, res) => {
        const dbConnect = db.GetDB().collection("products")

        dbConnect.find({
                visible: true
        })
                .toArray(function (err, products) {
                        if (err) {
                                console.log("Error Data")
                                res.sendStatus(404).json(undefined)
                        } else {
                                console.log("Data is found")
                                res.status(200).json(products)
                        }
                })
})

Route.get("/products/data/:id", (req, res) => {
        const dbConnect = db.GetDB().collection("products")


        dbConnect.findOne({
                _id: new ObjectId(req.params.id)
        }, (err, product) => {
                if (err) {
                        console.error("Data ID error")
                        res.sendStatus(404).json(undefined)
                } else {
                        console.log("Data ID found")
                        setTimeout(() => res.status(200).json(product), 2000)
                }
        })
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route