const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const { getDB } = require('../database/database');


Route.post("/products/data/add", (req, res, next) => {
        let error = []
        const dbConnect = getDB().collection("products")

        const { nameCard, type, fav, urlImage, modal } = req.body

        if (nameCard == undefined)
                error.push("nameCard error")

        if (type == undefined)
                error.push("type error")


        if (fav == undefined)
                error.push("fav error")


        if (urlImage == undefined)
                error.push("urlImage error")


        if (modal == undefined)
                error.push("modal error")

        if (error.length > 0) {
                res.status(404).json({ ok: false, error: error })
                return;
        }

        dbConnect.insertOne({
                nameCard: nameCard,
                type: type,
                fav: fav,
                urlImage: urlImage,
                modal: modal
        })
                .then((proc) => {
                        const ID = proc.insertedId.toString();
                        res.json({ ok: true, id: ID })
                })
                .catch(function (err) {
                        res.json({
                                ok: false,
                                error: err
                        });
                })
})

Route.delete("/products/data/:id", (req, res) => {
        const dbConnect = getDB().collection('products')

        dbConnect.deleteOne({
                _id: new ObjectId(req.params.id)
        }).then((proc) => {
                if (deletedCount != 0)
                        res.sendStatus(200)
                else
                        res.sendStatus(404)
        })
                .catch(err => {
                        res.status(404).json({ err })
                })
})

Route.patch("/products/data/:id", (req, res) => {
        const dbConnect = getDB().collection("products")

        const ID = new ObjectId(req.params.id)
        const { nameCard, modal, fav, type, urlImage } = req.body

        dbConnect.findOne({ _id: ID }, (err, product) => {
                if (err)
                        res.status(400).json({ ok: false })
                else if (product == null)
                        res.status(404).json({ ok: false })
                else {

                        let productEdit = {};
                        let modify = false

                        if (product.nameCard != nameCard) {
                                productEdit.nameCard = nameCard
                                modify = true;
                        }

                        if (product.fav != fav) {
                                productEdit.fav = fav
                                modify = true;
                        }

                        if (product.urlImage != urlImage) {
                                productEdit.urlImage = urlImage
                                modify = true;
                        }

                        if (product.type != type) {
                                productEdit.type = type
                                modify = true;
                        }

                        if (JSON.stringify(product.modal) != JSON.stringify(modal)) {
                                productEdit.modal = modal
                                modify = true;
                        }

                        if (modify) {
                                dbConnect.updateOne({
                                        _id: ID
                                }, {
                                        $set: productEdit
                                })
                                        .then(() => {
                                                res.status(200).json({ ok: true })
                                        })
                                        .catch(err => {
                                                console.error(err)
                                                res.status(404).json({ ok: false, error: err })
                                        })
                        } else {
                                res.status(418).json({ ok: false, error: "I'm teapot" })
                        }

                }
        })

})


Route.post("/products/data/add", (req, res, next) => {
        let error = []
        const dbConnect = getDB().collection("products")

        const { nameCard, type, fav, urlImage, modal } = req.body

        if (nameCard == undefined)
                error.push("nameCard error")

        if (type == undefined)
                error.push("type error")


        if (fav == undefined)
                error.push("fav error")


        if (urlImage == undefined)
                error.push("urlImage error")


        if (modal == undefined)
                error.push("modal error")

        if (error.length > 0) {
                res.status(404).json({ ok: false, error: error })
                return;
        }

        dbConnect.insertOne({
                nameCard: nameCard,
                type: type,
                fav: fav,
                urlImage: urlImage,
                modal: modal
        })
                .catch(function (err) {
                        error.push(err.name)
                })

        if (error.length > 0) {
                res.json({
                        ok: false,
                        error: error
                });
                return;
        }


        res.json({ ok: true })
})

Route.get("/products/data", (req, res) => {
        const dbConnect = getDB()

        const date = new Date()

        console.log("Comienzo de peticion", date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds())

        dbConnect.collection("products")
                .find({})
                .toArray(function (err, products) {
                        const date2 = new Date()
                        console.log("Fin de peticion", date2.getMinutes() + ":" + date2.getSeconds() + ":" + date2.getMilliseconds())
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