const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cartTotal: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: [Object],
        required: false
    }

});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;