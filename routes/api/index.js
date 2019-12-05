const router = require("express").Router();
const productRoutes = require("./product");
const recipeRoutes = require("./recipe");
const userRoutes = require("./user");


router.use("/product", productRoutes);
router.use("/recipe", recipeRoutes);
router.use("/user", userRoutes);
module.exports = router;