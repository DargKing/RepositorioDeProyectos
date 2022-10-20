const express = require('express');
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { getDB } = require('../database/database');

Route.get("/products/data", async (req, res) => {
        const dbConnect = getDB()

        const date = new Date()
        
        console.log(date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds())
        
        dbConnect.collection("products")
        .find({})
        .toArray(function (err, products) {
                        const date2 = new Date()
                        console.log(date2.getMinutes() + ":" + date2.getSeconds() + ":" + date2.getMilliseconds())
                        if (err)
                                res.sendStatus(404).json(undefined)
                        else
                                res.json(products)
                })
})

Route.get("/products/data/:nameCard", (req, res) => {
        const dbConnect = getDB()

        dbConnect.collection("products")
                .findOne({ nameCard: req.params.nameCard.replace(/::/gi, " ") }, (err, product) => {
                        if (err)
                                res.sendStatus(404).json(undefined)
                        else
                                res.json(product)
                })
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route