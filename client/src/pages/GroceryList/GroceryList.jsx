import React, { Component } from 'react';
import { Grid, Row, Table, Well } from 'react-bootstrap'
import API from "../../utils/API";
import CartButton from "../../components/cartButton/cartButton.jsx"

class GroceryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groceryList: { key: [] },
            display: "block"
        }
    }

    componentDidMount() {
        API.getProducts(this.props.user._id)
            .then(res =>
                this.setState({ products: res.data }, () => this.createGroceryList())
            )
            .catch(err => console.log(err));
    }

    createGroceryList = () => {
        let groceryList = {

        }

        for (let i = 0; i < this.props.cart.length; i++) {
            for (let j = 0; j < this.props.cart[i].ingredients.length; j++) {
                let ingredient = this.props.cart[i].ingredients[j]
                if (!groceryList[ingredient.product.category]) {
                    groceryList[ingredient.product.category] = []
                }
                let onList = groceryList[ingredient.product.category].find(groceryItem => groceryItem.productId === ingredient.product._id)
                if (onList) {
                    onList.recipesAmount += ingredient.amount * this.props.cart[i].cartTotal
                    onList.cartTotal = Math.ceil(onList.recipesAmount / onList.productAmount)
                } else {
                    let groceryItem = {
                        name: ingredient.product.name,
                        productId: ingredient.product._id,
                        productMeasurement: ingredient.product.measurement,
                        productAmount: ingredient.product.amount,
                        recipesAmount: ingredient.amount * this.props.cart[i].cartTotal,
                        cartTotal: Math.ceil(ingredient.amount * this.props.cart[i].cartTotal / ingredient.product.amount),
                        counter: this.props.cart[i].cartTotal,
                        category: ingredient.product.category,
                    }
                    groceryList[groceryItem.category].push(groceryItem)
                }

            }
        }
        this.setState({ groceryList })
    }
    changeProductQuantity = groceryItem => {
        let groceryList = this.state.groceryList
        groceryList[groceryItem.category][groceryItem.index] = groceryItem
        this.setState({ groceryList })
        this.props.setList(this.state.groceryList)
    }

    handleChange = event => {
        let value = event.target.id
        this.setState({ [value]: event.target.value })
    }
    updateCartTotal = async (recipes) => {
        for (let i = 0; i < recipes.length; i++) {
            let newRecipe = recipes[i]
            newRecipe.cartTotal = 0
            await API.updateRecipe(newRecipe._id, newRecipe)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }
    loadWalmartCart = () => {
        const list = this.state.groceryList
        this.props.setList(list)
        this.props.cartFinished("cartFinished")
        this.updateCartTotal(this.props.cart)
        API.updateUser(this.props.user._id, { cart: [] })
            .then(res => this.props.emptyCart())
            .catch(err => console.log(err));

    }
    render() {
        return (
            <Grid style={{ paddingTop: "60px" }}>
                <Row style={{}}>

                    <button className="myBtn" children="Finish List" onClick={this.loadWalmartCart} />

                </Row>
                <Row>
                    <div style={{ paddingBottom: "100px" }} children=
                        {Object.keys(this.state.groceryList).map((key, index) =>
                            <div key={key}>
                                <Well style={{ backgroundColor: "#258FA7", backgroundImage: "none", color: "white", maxWidth: "600px", margin: "5% auto 0px", borderRadius: "0px" }} children={key.charAt(0).toUpperCase() + key.slice(1)} />
                                <Table striped style={{ border: "1px #ddd solid", margin: "0px auto", maxWidth: "600px" }}>
                                    <tbody className="groceryListTbody" children={
                                        this.state.groceryList[key].map((groceryItem, index) => (
                                            <tr key={groceryItem.name}>
                                                <td
                                                    className="groceryListCart"><CartButton recipe={{ ...groceryItem, index: index }} updateCart={this.changeProductQuantity} />

                                                </td>
                                                <td>
                                                    <p className="groceryListTitle">{groceryItem.name}</p>
                                                    <p className="groceryListP">Product amount: {groceryItem.productAmount}{"\u00a0"}{groceryItem.productMeasurement}</p>
                                                    <p className="groceryListP">Recipes Need: {groceryItem.recipesAmount}{"\u00a0"}{groceryItem.productMeasurement}</p>
                                                </td>
                                            </tr>
                                        ))} />
                                </Table>
                            </div>
                        )} />
                </Row>
            </Grid>
        )
    }
}

export default GroceryList;