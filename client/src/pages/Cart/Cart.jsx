import React, { Component } from 'react';
import GroceryList from '../GroceryList/GroceryList'
import CartList from '../CartList/CartList'
import CartFinished from '../CartFinished/CartFinished'

class Cart extends Component {

    state = {
        activeComponent: 'cartList',
        list: []
    }

    changeComponent = component => {
        this.setState({ activeComponent: component })
    }

    setList = groceryList => this.setState({list: groceryList },()=> console.log(this.state.list))
    
    render() {
        const cartList =
            <CartList
                cart={this.props.cart}
                generateGrocery={this.changeComponent.bind(this)}
                updateCart={this.props.updateCart}
            />
        const groceryList =
            <GroceryList
                cartFinished ={this.changeComponent.bind(this)}
                cart={this.props.cart}
                user={this.props.user}
                updateCart={this.props.updateCart}
                emptyCart={this.props.emptyCart}
                setList = {this.setList.bind(this)}
            />
        const cartFinished = <CartFinished  user = {this.props.user} groceryList = {this.state.list}/>
        let activeComponent
        if (this.state.activeComponent === "cartList") {
            activeComponent = cartList
        } else if (this.state.activeComponent === "groceryList") {
            activeComponent = groceryList
        } else {
            activeComponent = cartFinished
        }
        return (
            <div>
                {activeComponent}
            </div>
        )
    }
}

export default Cart;