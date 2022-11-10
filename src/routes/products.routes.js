const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const { getDB } = require('../database/database');


Route.get("/products/data", (req, res) => {
        const dbConnect = getDB()

        const date = new Date()

        console.log("Comienzo de peticion", date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds())

        dbConnect.collection("products")
                .find({
                        visible: true
                })
                .toArray(function (err, products) {
                        const date2 = new Date()
                        console.log("Fin de peticion", date2.getMinutes() + ":" + date2.getSeconds() + ":" + date2.getMilliseconds())
                        if (err)
                                res.sendStatus(404).json(undefined)
                        else
                                setTimeout(() => res.json(products), 5)
                })
})

Route.get("/products/data/:id", (req, res) => {
        const dbConnect = getDB()


        dbConnect.collection("products")
                .findOne({ _id: new ObjectId(req.params.id) }, (err, product) => {
                        if (err)
                                res.sendStatus(404).json(undefined)
                        else
                                setTimeout(() => res.json(product), 54)
                })
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route