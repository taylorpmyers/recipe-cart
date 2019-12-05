import React, { Component } from 'react';
import { Grid, Row, Col, Table, Well } from 'react-bootstrap'
import API from "../../utils/API";
import CartButton from '../../components/cartButton/cartButton'
import emptyCartImage from '../../utils/images/empty-cart.png'

class CartList extends Component {
    state = {
        active: ""
    }
    updateCart = (updatedRecipe) => {
        API.updateRecipe(updatedRecipe._id, updatedRecipe)
        console.log(updatedRecipe)
            .then(res => {
                this.props.updateCart(updatedRecipe)
                
            })
            .catch(err => console.log(err));
    }

    render() {
        let display = "none";
        if (this.props.cart.length < 1) { display = "inherit" }
        return (
            <Grid style = {{paddingTop: "60px"}}>

                <Row>
                    <Col>
                        <Well style={{ backgroundColor: "#258FA7", backgroundImage: "none", color: "white", maxWidth: "600px", margin: "5% auto 0px" }}>
                            <p style={{ fontSize: "20px" }}>Your Cart
                            <button className = "myBtn" style={{ float: "right", marginTop: "-14px", border: "1px solid  white"}} onClick={() => this.props.generateGrocery("groceryList")} children="Generate Grocery List" />
                            </p>

                        </Well>
                        <img src={emptyCartImage} alt={"Your cart is empty"} style={{ border: "1px #ddd solid", maxWidth: '600px', width: "100%", display: display, margin: "0 auto" }} />
                        <Table striped style={{ border: "1px #ddd solid", margin: "0px auto", maxWidth: "600px" }}>
                            <tbody
                                children={this.props.cart.map((recipe, index) => (
                                    <tr key={recipe._id}>
                                        <td>
                                            <img alt = {recipe.name} style = {{width: "100px",height: "auto"}}src = {recipe.src} />
                                        </td>
                                        <td>
                                            <p className = "cartListP" style = {{display: "inline-block" , marginTop: "20px",overflow: "hidden",whiteSpace: "nowrap", textOverflow: "ellipsis", width: 150}}>{recipe.name}</p>
                                            <CartButton recipe={recipe} updateCart={this.updateCart} />
                                        </td>
                                    </tr>
                                ))}
                            />
                        </Table>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default CartList;