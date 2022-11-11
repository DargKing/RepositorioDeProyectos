const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const { getDB } = require('../database/database');


Route.get("/products/data", (req, res) => {
        const dbConnect = getDB()

        dbConnect.collection("products")
                .find({
                        visible: true
                })
                .toArray(function (err, products) {
                        if (err){
                                console.log("Error Data")
                                res.sendStatus(404).json(undefined)
                        } else {
                                console.log(products)
                                res.status(200).json(products)
                        }
                })
})

Route.get("/products/data/:id", (req, res) => {
        const dbConnect = getDB()


        dbConnect.collection("products")
                .findOne({ _id: new ObjectId(req.params.id) }, (err, product) => {
                        if (err){
                                res.sendStatus(404).json(undefined)
                        } else{
                               res.status(200).json(product)
                        }
                })
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route