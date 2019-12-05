const db = require("../models");
const mongoose = require("mongoose");
const data = require("./recipes.js")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/GoKart");


const user = {
    user: "demo",
    password: "demo",
    cart: [],
}

async function createRecipes(user) {
    const recipes = data.recipes
    for (let i = 0; i < recipes.length; i++) {
        console.log("for loop recipes")
        recipes[i].user = user
        let products = []
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const product = recipes[i].ingredients[j].product
            product.user = user
            await db.Product
                .findOneAndUpdate({
                    name: product.name
                }, product, {
                    upsert: true,
                    new: true
                })
                .then(dbModel => recipes[i].ingredients[j].product = dbModel)
                .catch(err => console.log("ingredients failed. " + err));
        }
        await db.Recipe
            .create(recipes[i])
            .then(dbModel => console.log(dbModel))
            .catch(err => console.log("recipes failed. " + err));
    }
}

async function createUser() {
    console.log("fired")
    await db.User
        .create(user)
        .then(dbModel => {
                console.log(dbModel)
                createRecipes(dbModel._id)
            }

        )
        .catch(err => console.log("user failed. " + err));
}

async function dropDatabase() {
    await db.Recipe.deleteMany({})
        .then(dbModel => console.log(dbModel))
        .catch(err => console.log("recipes failed. " + err));
    await db.Product.deleteMany({})
        .then(dbModel => console.log(dbModel))
        .catch(err => console.log("recipes failed. " + err));
    await db.User.deleteMany({})
        .then(dbModel => console.log(dbModel))
        .catch(err => console.log("recipes failed. " + err));
    createUser()
}

dropDatabase()