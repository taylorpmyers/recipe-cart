import axios from "axios";

export default {
  //Loads Cart
  loadCart: items => {
    return axios.post("/api/walmart/cartLoad", items);
  },
  // Gets the user with the given id
  getUser: function (data) {
    return axios.post("/api/user/login", data);
  },
  updateUser: function (id, user) {
    return axios.put("/api/user/" + id, user);
  },
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/user", userData);
  },
  // Gets all recipes
  getRecipes: function (user) {
    return axios.get("/api/recipe/" + user);
  },
  // Gets the recipe with the given id
  getRecipe: function (id) {
    return axios.get("/api/recipe/" + id);
  },
  // Deletes the recipe with the given id
  deleteRecipe: function (id) {
    return axios.delete("/api/recipe/" + id);
  },
  // Saves a recipe to the database
  saveRecipe: function (recipeData) {
    return axios.post("/api/recipe", recipeData);
  },
  updateRecipe: function (id, recipeData) {
    return axios.put("/api/recipe/" + id, recipeData);
  },
  // Gets all products
  getProducts: function (user) {
    return axios.get("/api/product/" + user);
  },
  // Gets the product with the given id
  getProduct: function (id) {
    return axios.get("/api/product/" + id);
  },
  // Deletes the product with the given id
  deleteProduct: function (id) {
    return axios.delete("/api/product/" + id);
  },
  // Saves a product to the database
  saveProduct: function (productData) {
    return axios.post("/api/product", productData);
  },
};