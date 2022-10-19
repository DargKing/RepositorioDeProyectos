const { Schema, model } = require('mongoose')

const productsData = new Schema({
        nameCard: String
}, {
        timestamps: true
})

module.exports = model("products", productsData)