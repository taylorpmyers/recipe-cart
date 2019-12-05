const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    measurement: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;