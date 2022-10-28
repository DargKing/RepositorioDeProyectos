const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const DataBase = require('../database/database');
const jwt = require('jsonwebtoken')

const db = new DataBase();

db.connectDatabase((err) => {
        if (err)
                console.error(err);
        else
                console.log("DB is conected")
})

if (process.env.SECRET_KEY_JWT == undefined)
        process.env.SECRET_KEY_JWT = "passord";

Route.post("/users/token", (req, res) => {
        const token = req.body.token;

        if (typeof (token) != "string") {
                res.status(400).json({
                        ok: false,
                        error: ["The DataType is incorrect"]
                })
                return;
        }

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decode) => {
                if (err) {
                        res.status(400).json({ ok: false, error: ["La Sesion a expirado"] })
                        return;
                }

                res.json(decode)
        })

})

Route.post("/users/login", async (req, res) => {

        /** @type {string} */
        const username = req.body.username

        /** @type {string} */
        const password = req.body.password

        var error = []

        if (typeof (username) != "string" || typeof (password) != "string") {
                error.push("The DataType is incorrect")
        }

        if (username.length > 32 || password.length > 32) {
                error.push("The username or the password is very long")
        }

        if (error.length > 0) {
                res.status(400).json({
                        ok: false,
                        error: error
                })
                return;
        }


        const user = await db.searchUser(username, password);

        if (!user) {
                res.status(404).json({
                        ok: false,
                        error: ["User not found"]
                })
                return;
        }

        jwt.sign({
                user: {
                        id: user._id,
                        username: user._id
                },
                ok: true
        }, process.env.SECRET_KEY_JWT, {
                expiresIn: "5h"
        }, (err, token) => {
                if (err) {
                        res.status(500).json({
                                ok: false,
                                error: ["Server Error"]
                        })
                        return;
                }
                res.status(200).json({
                        ok: true,
                        user: {
                                id: user._id,
                                username: user.username
                        },
                        token: token
                })
        })
})

Route.post("/users/singup", async (req, res) => {

        /** @type {string} */
        const username = req.body.username

        /** @type {string} */
        const password = req.body.password

        let error = [];

        if (typeof (username) != "string" || typeof (password) != "string") {
                error.push("The DataType is incorrect")
        }

        if (username.length > 32 || password.length > 32) {
                error.push("The username or the password is very length")
        }

        if (error.length > 0) {
                res.status(400).json({
                        ok: false,
                        error: error
                })
                return;
        }


        const search = await db.searchData("users", "username", username)

        if (search != null) {
                res.status(400).json({ ok: false, error: ["User already exists"] })
                return;
        }

        await db.insertData("users", {
                username: username,
                password: password
        })
        res.status(200).json({ ok: true })
})

Route.post("/products/data/add", (req, res, next) => {
        let error = []

        const { nameCard, type, fav, urlImage, modal, token } = req.body

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

        if (token == undefined)
                error.push("token not exist")



        if (error.length > 0) {
                res.status(400).json({ ok: false, error: error })
                return;
        }

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
                if (err) {
                        res.status(401).json({ ok: false, error: "La sesion a expirado" })
                        return;
                }

                const dbConnect = db.GetDB().collection("products")

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
})

Route.delete("/products/data/:id", (req, res) => {
        const { token } = req.body

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, data) => {
                if (err) {
                        res.status(401).json({ ok: false, error: "La sesion ha expirado" })
                        return;
                }

                const dbConnect = db.GetDB().collection('products')

                dbConnect.deleteOne({
                        _id: new ObjectId(req.params.id)
                }).then((proc) => {
                        if (proc.deletedCount != 0)
                                res.status(200).json({ ok: true })
                        else
                                res.status(404).json({ ok: false, error: "Producto no Encontrado" })
                })
                        .catch(err => {
                                res.status(500).json({ ok: false, error: err.message + " Reporte el error" })
                        })
        })

})

Route.patch("/products/data/:id", (req, res) => {

        try {
                jwt.verify(req.body.token, process.env.SECRET_KEY_JWT)
        } catch (err) {
                res.status(401).json({ ok: false, error: "La sesion ha expirado" })
                return;
        }

        const dbConnect = db.GetDB().collection("products")

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
                                                res.status(404).json({ ok: false, error: ["No se pudo actualizar el producto"] })
                                        })
                        } else {
                                res.status(418).json({ ok: false, error: "I'm teapot" })
                        }

                }
        })

})

Route.patch("/products/data/visibility/:id", (req, res) => {

        try {
                jwt.verify(req.body.token, process.env.SECRET_KEY_JWT)
        } catch (err) {
                res.status(401).json({ ok: false, error: "La sesion ha expirado" })
                return;
        }

        const dbConnect = db.GetDB().collection("products")

        const ID = new ObjectId(req.params.id)

        dbConnect.findOne({ _id: ID }, (err, product) => {
                if (err)
                        res.status(400).json({ ok: false, error: "Error de la Base de Datos" })
                else if (product == null)
                        res.status(404).json({ ok: false, error: "Producto no Encontrado" })
                else {
                        dbConnect.updateOne({
                                _id: ID
                        }, {
                                $set: {
                                        visible: !product.visible
                                }
                        })
                                .then(() => {
                                        res.status(200).json({ ok: true })
                                })
                                .catch(err => {
                                        res.status(404).json({ ok: false, error: "Error del servidor" })
                                })
                }
        })

})

Route.get("/products/data/all/:token", async (req, res) => {

        try {
                jwt.verify(req.params.token, process.env.SECRET_KEY_JWT)
        } catch (err) {
                res.status(401).json({ ok: false, error: "La sesion ha expirado" })
                return;
        }

        const data = await db.getList("products")

        if (data.message) {
                res.status(400).json({ ok: false, error: data.message })
                return;
        }

        res.status(200).json(data)
})

Route.get("/products/data/product/:id", async (req, res) => {
        try {
                jwt.verify(req.query.token, process.env.SECRET_KEY_JWT)
        } catch (err) {
                res.status(401).json({ ok: false, error: "La sesion ha expirado" })
                return;
        }

        const data = await db.searchData("products", "_id", new ObjectId(req.params.id))
        console.log(data)
        if (!data) {
                res.status(404).json({ok: false, error: "Producto No Encontrado"})
                return;
        }

        if (data.error) {
                res.status(500).json({ ok: false, error: "Server Error" })
                return;
        }

        if (data.message) {
                res.status(500).json({ ok: false, error: data.message })
                return;
        }

        res.status(200).json(data)
})

Route.get("/*", (req, res) => {

        res.render('index');
})

module.exports = Route