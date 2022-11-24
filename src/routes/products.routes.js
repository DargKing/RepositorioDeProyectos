/* 

Archivo manejador de rutas

process.env.SECRET_KEY_JWT

*/

const express = require('express');
const app = express();
const Route = express.Router();
const fs = require('fs');
const path = require('path');
const { ObjectId, MongoClient } = require('mongodb')
const DataBase = require('../database/database');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { generateID } = require('../helpers/ID')

const db = new DataBase();

db.connectDatabase((err) => {
        if (err)
                console.error(err);
        else
                console.log("DB is conected")
})

if (process.env.SECRET_KEY_JWT == undefined)
        process.env.SECRET_KEY_JWT = "passord";

if (process.env.EXPIRES_KEY_JWT == undefined)
        process.env.EXPIRES_KEY_JWT = "2h"

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
                expiresIn: process.env.EXPIRES_KEY_JWT
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

Route.patch("/products/data/addModal", multer({ storage: multer.memoryStorage(), limits: { fileSize: 200000 } }).single("img"), (req, res) => {

        const { mimetype } = req.file

        const { name, carac, desc, id, visible, price, token } = req.body

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
                if (err) {
                        res.status(401).json({ ok: false, error: "La sesion a expirado" })
                        return;
                }

                if (mimetype != "image/jpeg") {
                        res.sendStatus(400)
                        return;
                }

                const imageCollection = db.GetDB().collection("images")

                const buffer = req.file.buffer.toString("base64")

                const data = req.file

                data.buffer = buffer

                imageCollection.insertOne(data)
                        .then((img) => {
                                const ID = img.insertedId.toString();
                                const productsCollection = db.GetDB().collection("products")

                                productsCollection.updateOne({
                                        _id: new ObjectId(id)
                                }, {
                                        $push: {
                                                modal: {
                                                        name: name,
                                                        carac: JSON.parse(carac),
                                                        desc: JSON.parse(desc),
                                                        visible: (visible == "true") ? true : false,
                                                        price: price,
                                                        url: `/products/data/modalImg/${ID}`,
                                                        idImg: ID
                                                }
                                        }
                                })
                                        .then((resDB) => {
                                                if (resDB.modifiedCount > 0) {
                                                        res.sendStatus(200)
                                                } else {
                                                        res.sendStatus(404)
                                                }
                                        })
                                        .catch(() => {
                                                res.sendStatus(500)
                                        })
                        })
        })
})

Route.get("/updateAll", async (req, res) => {

        const data = await db.getList("products", {})

        data.forEach(async (element) => {
                const file = fs.readFileSync(path.join(__dirname, "../public" + element.urlImage))

                const dataImage = {
                        fieldname: "img",
                        originalname: element.urlImage.split("/")[3],
                        encoding: "7bit",
                        mimetype: "image/jpeg",
                        buffer: file.toString("base64"),
                        size: file.byteLength
                }

                const imageCollection = db.GetDB().collection("images")
                const responseDbImage = await imageCollection.insertOne(dataImage)

                const productsCollection = db.GetDB().collection("products")

                const ID = responseDbImage.insertedId.toString()

                productsCollection.updateOne({ _id: element._id }, {
                        $set: {
                                urlImage: `/products/data/modalImg/${ID}`
                        }
                })

                let newElement = []

                element.modal.forEach(async (mod) => {
                        let target = mod
                        if (target.url == element.urlImage) {
                                target.url = `/products/data/modalImg/${ID}`
                                target.idImg = ID
                                newElement.push(mod)
                        } else {
                                const fileModal = fs.readFileSync(path.join(__dirname, "../public" + target.url))
                                const dataImageModal = {
                                        fieldname: "img",
                                        originalname: target.url.split("/")[3],
                                        encoding: "7bit",
                                        mimetype: "image/jpeg",
                                        buffer: fileModal.toString("base64"),
                                        size: fileModal.length
                                }
                                const responseDbImageModal = await imageCollection.insertOne(dataImageModal)

                                const IdModal = responseDbImageModal.insertedId.toString()

                                target.url = `/products/data/modalImg/${IdModal}`
                                target.idImg = IdModal
                                newElement.push(target)
                        }
                })
                setTimeout(() => {
                        productsCollection.updateOne({ _id: element._id }, {
                                $set: {
                                        modal: newElement
                                }
                        })
                }, 5000)
        });
        res.sendStatus(200)
})

/* Deprecated */
Route.delete("/products/data/deleteModal/:id", (req, res) => {
        const { modal, idImg, token } = req.body

        const { id } = req.params

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
                if (err) {
                        res.status(401).json({ ok: false, error: "La sesion a expirado" })
                        return;
                }

                if (modal[0] == undefined) {
                        res.sendStatus(400)
                        return;
                }

                const productsCollection = db.GetDB().collection("products")

                productsCollection.updateOne({
                        _id: new ObjectId(id)
                }, {
                        $set: {
                                modal: modal
                        }
                }
                ).then((resDB) => {
                        if (resDB.modifiedCount > 0) {
                                const imageCollection = db.GetDB().collection('images')

                                imageCollection.deleteOne({ _id: new ObjectId(idImg) })
                                        .then(() => {
                                                res.sendStatus(200)
                                        })
                                        .catch(() => {
                                                res.sendStatus(400)
                                        })
                        } else {
                                res.sendStatus(404)
                        }
                })
                        .catch(() => {
                                res.sendStatus(500)
                        })
        })
})

Route.patch("/products/data/ModifyModalImg/:id", multer({ storage: multer.memoryStorage(), limits: { fileSize: 200000 } }).single("img"), async (req, res) => {
        const { nameElement, token } = req.body
        const file = req.file
        const { id } = req.params

        jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, decoded) => {
                if (err) {
                        res.status(401).json({ ok: false, error: "La sesion a expirado" })
                        return;
                }

                const productsCollection = db.GetDB().collection("products")
                const imageCollection = db.GetDB().collection("images")

                const data = await productsCollection.findOne({
                        _id: new ObjectId(id)
                })

                // const data = db.searchData("products", "_id")

                if (data == null) {
                        res.status(404).json({ ok: false, error: "Producto no encontrado" })
                        return;
                }

                if (file.mimetype != "image/jpeg") {
                        res.status(400).json({ ok: false, error: "Tipo de archivo incorrecto" })
                        return;
                }

                res.setHeader('Content-Type', 'application/json')

                file.buffer = file.buffer.toString("base64")
                imageCollection.insertOne(file)
                        .then((resDB) => {
                                let modal = data.modal
                                const index = modal.findIndex((element) => element.name == nameElement)
                                const ID = resDB.insertedId.toString()
                                modal[index].url = `/products/data/modalImg/${ID}`
                                modal[index].idImg = ID


                                
                                productsCollection.updateOne({
                                        _id: new ObjectId(id)
                                }, {
                                        $set: {
                                                modal: modal
                                        }
                                }).then((resDB) => {
                                        if (resDB.modifiedCount > 0) {
                                                res.status(200).json({ ok: true })
                                        } else {
                                                res.status(404).json({ ok: false, error: "Producto no actualizado" })
                                        }
                                })
                                        .catch((err) => {
                                                res.status(500).json({ ok: false, error: "Error De la Base de Datos 2" })
                                        })
                        })
                        .catch((err) => {
                                console.log(err)
                                res.status(500).json({ ok: false, error: "Error De la Base de Datos 1" })
                        })
        })
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
        res.end(buffer)
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
        if (!data) {
                res.status(404).json({ ok: false, error: "Producto No Encontrado" })
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