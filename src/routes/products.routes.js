const express = require('express');
const Route = express.Router();
const fs = require('fs');
const mongoose = require('mongoose')
const path = require('path');

const productModel = require('../database/models/productsData')

Route.get("/products/data", (req, res) => {
        productModel.find({}, (err, products) => {
                if (err)
                        res.sendStatus(404).json(undefined)
                res.json(products)
        })
})

Route.get("/products/data/:nameCard", (req, res) => {
        productModel.findOne({ name: req.params.nameCard.replace(/::/gi, " ") }, function (err, product) {
                if (err)
                        res.sendStatus(404).json(undefined);

                res.json(product)
        })
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route