/* 
Este archivo te conecta a la base de datos 

process.env.MONGODB_URI
*/

const mongodb = require('mongodb')
const { MongoClient } = require('mongodb');


/**
 * @typedef { mongodb.Db } dbI
 */

if (process.env.MONGODB_URI == undefined)
        process.env.MONGODB_URI = "mongodb://localhost/27017"

const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});


class dbOption {
        constructor() {
                /** @type { dbI } */
                this.dbConnection = null;
        }

        /**
         * Inserta la base de datos
         * @param {Object} dbConnection 
         */
        SetDB = (dbConnection) => {
                this.dbConnection = dbConnection;
        }

        /** Devuelve la base de datos */
        GetDB = () => {
                return this.dbConnection
        }

        /**
         * Conecta la base de datos
         * 
         * @param {function} callback 
         */
        connectDatabase = function (callback) {
                client.connect((err, db) => {
                        if (err || !db)
                                return callback(err);
                        this.SetDB(db.db("LluvisolCA"));
                        return callback()
                })
        }

        /**
        * Busca en la base de datos si el usuario existe
        * 
        *       @param {String} username: El nombre del usuario.
        *       @param {String} password: La contraseña del usuario.
        */
        searchUser = async (username, password) => {
                /** @type {dbI} */
                const db = this.GetDB();

                const user = await db.collection("users")
                        .findOne({
                                username: username,
                                password: password
                        })

                if (user == null) {
                        return false
                }

                return user
        }

        /**
         * 
         * @param {String} collectionName Nombre de la coleccion
         * @param {String} dataName Nombre del dato a buscar
         * @param {Object} value Valor a buscar
         * @retuns Object || null
         */
        searchData = async (collectionName, dataName, value) => {

                if (typeof (collectionName) != "string") {
                        return {error: "Invalid collectionName"}
                }
                
                if (typeof (dataName) != "string") {
                        return {error: "Invalid dataName"}
                }

                if (value == null)
                        return {error: "Invalid value"};

                /** @type {dbI} */
                const db = this.GetDB();

                const collection = db.collection(collectionName)

                const data = await collection.findOne({
                        [dataName]: value
                })


                return data
        }


        /**
         * Inserta un objeto en la base de datos
         * 
         * @param {String} collectionName Nombre de la coleccion
         * @param {Object} data Objeto a introducir
         * 
         */
        insertData = async (collectionName, data) => {
                /** @type {dbI} */
                const db = this.GetDB();

                const collection = db.collection(collectionName)

                const ins = await collection.insertOne(data)

                return ins
        }

        /**
         * Devuelve todos los items que coincidan con el dataFilter
         * @param {*} collectionName Nombre de la coleccion
         * @param {*} dataFilter Datos a filtrar
         * @param {*} callback Funcion que se ejecutara al final de la busqueda
         * @returns Array
         */
        getList = async (collectionName, dataFilter, callback) => {
                if (typeof (collectionName) != "string") {
                        return false
                }

                if (typeof (dataFilter) != "object" && dataFilter != undefined) {
                        return false
                }

                const db = this.GetDB()
                const collection = db.collection(collectionName)

                const data = await collection.find(dataFilter).toArray()

                if (callback) {
                        callback(data)
                }

                return data
        }
}

module.exports = dbOption