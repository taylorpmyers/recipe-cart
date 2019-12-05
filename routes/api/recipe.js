const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/recipe" 
router.route("/")
  .post(recipeController.create);
// Matches with /api/recipe/:query
router.route("/:query")
  .get(recipeController.findAll)
// Matches with "/api/recipe/:id" 
router
  .route("/:id")
  .get(recipeController.findById)
  .put(recipeController.update)
  .delete(recipeController.remove);
module.exports = router;