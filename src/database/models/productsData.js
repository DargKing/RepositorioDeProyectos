const { Schema, model } = require('mongoose')

const productsData = new Schema({
        nameCard: String,
        urlImage: String,
        type: String,
        fav: Boolean,
        modal: Array
}, {
        timestamps: true
})

module.exports = model("products", productsData)