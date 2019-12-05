import React, { Component } from 'react';
import {Grid, Row, Col } from 'react-bootstrap';
import API from "../../utils/API";
import NoImage from "../../utils/images/noImage.jpg"
import "./recipes.css"
import RecipeDiv from "../../components/recipeDiv/recipeDiv.jsx"
import RecipeModal from "../../components/recipeModal/recipeModal.jsx"
import ProductModal from "../../components/productModal/productModal.jsx"

class Recipes extends Component {

    state = {
        active: { ingredients: [] },
        recipes: [],
        products: [],
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        API.getRecipes(this.props.user._id)
            .then(res =>
                this.setState({ recipes: res.data })
            )
            .catch(err => console.log(err));

        API.getProducts(this.props.user._id)
            .then(res =>
                this.setState({ products: res.data })
            )
            .catch(err => console.log(err));
    };
    createNewRecipe = () => {
        const string = `New Recipe ${Math.random().toString(36).substr(2, 5)}`
        let recipe = {
            name: string,
            user: this.props.user,
            cartTotal: 0,
            src: NoImage
        }
        API.saveRecipe(recipe)
            .then(res => {
                const recipes = this.state.recipes
                recipes.unshift(res.data)
                this.setState({ recipes, active: res.data }, () => this.setState({ recipeShow: true }))
            })
            .catch(err => console.log(err));


    }
    recipeClose() {
        const active = { ingredients: [] }
        this.setState({ recipeShow: false, active });
    }

    recipeShow(recipe) {
        const active = this.state.recipes[recipe]
        this.setState({ active: active, recipeShow: true })
    }

    ingredientClose = () => {
        this.setState({ ingredientShow: false })
    }

    ingredientShow = () => {
        this.setState({ ingredientShow: true })
    }

    addProduct = product => {
        const newProductArray = this.state.products;
        newProductArray.push(product)
        this.setState({ products: newProductArray })
    }

    updateCart = (updatedRecipe) => {
        API.updateRecipe(updatedRecipe._id, updatedRecipe)
            .then(res => {
                let recipes = this.state.recipes
                recipes.find(recipe => recipe._id === updatedRecipe._id).cartTotal = updatedRecipe.cartTotal
                this.setState({ recipes },)
                this.props.updateCart(updatedRecipe)
            })
            .catch(err => console.log(err));
    }

    deleteRecipe = recipe => {
        let deletedRecipe = recipe
        deletedRecipe.cartTotal = 0
        this.props.updateCart(deletedRecipe)
        API.deleteRecipe(recipe._id)
            .then(res => {
                let recipes = this.state.recipes
                recipes = recipes.filter(each => each._id !== recipe._id)
                this.setState({ recipes })
            })
            .catch(err => console.log(err));

    }
    render() {
        return (
            <Grid style = {{paddingTop: "80px"}}>
                <Row id="mainDiv">
                    <Col id="recipeButtons" xs={12}>
                        <button className = "myBtn"children="Create New Recipe" onClick={this.createNewRecipe} />
                        {" "}
                        <button className = "myBtn"children="Add Product" onClick={this.ingredientShow} />
                    </Col>
                </Row>
                <Row id="recipeContainer"
                    children={this.state.recipes.map((recipe, index) => (
                        <RecipeDiv
                            recipe={recipe}
                            index={index}
                            key={recipe._id}
                            onClick={this.recipeShow.bind(this)}
                            updateCart={this.updateCart.bind(this)}
                            deleteRecipe={this.deleteRecipe.bind(this)}
                        />
                    ))}
                >
                </Row>
                <RecipeModal
                    show={this.state.recipeShow}
                    onHide={this.recipeClose.bind(this)}
                    active={this.state.active}
                    options={this.state.products.map(product => (
                        { key: product.id, value: product, label: product.name }
                    ))}
                />
                <ProductModal
                    show={this.state.ingredientShow}
                    onHide={this.ingredientClose.bind(this)}
                    addProduct={this.addProduct.bind(this)}
                    user={this.props.user}
                />
            </Grid>
        )
    }
}

export default Recipes;