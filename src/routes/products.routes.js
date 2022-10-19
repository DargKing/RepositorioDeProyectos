const express = require('express');
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { getDB } = require('../database/database');

Route.get("/products/data", async (req, res) => {
        const dbConnect = getDB()

        dbConnect.collection("products")
                .find({})
                .toArray(function (err, products) {
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