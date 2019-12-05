import React, { Component } from 'react';
import { FormControl, Glyphicon } from 'react-bootstrap'

class cartButton extends Component {

    constructor(props) {
        super(props);
        this.state = this.updatePropStyles(this.props.recipe.cartTotal)
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            const state = this.updatePropStyles(this.props.recipe.cartTotal)
            this.setState({
                recipe: state.recipe,
                input: state.input,
                buttonOne: state.buttonOne,
                buttonTwo: state.buttonTwo
            })
        }
    }
    updatePropStyles = num => {
        if (num === 0) {
            return {
                recipe: this.props.recipe,
                input: {
                    value: this.props.recipe.cartTotal,
                    style: { display: "none" },
                },
                buttonOne: {
                    styles:{ textAlign: "left", padding: "12px"},
                    children: <div style= {{whiteSpace: "nowrap"}}><Glyphicon glyph="shopping-cart" /> Add to Cart</div>,
                    onClick: () => this.updateCart(1),
                },
                buttonTwo: {
                    styles: {
                        display: "none"
                    },
                    children: "",
                    onClick: () => { },
                },
            }
        } else {
            return {
                recipe: this.props.recipe,
                input: {
                    value: this.props.recipe.cartTotal,
                    style: { display: "inline-block", width: "40px", margin: "10px 5px",},
                },
                buttonOne: {
                    styles: {
                        display: "inline-block", padding: "6px", borderRadius: "100px",
                    },
                    children: <Glyphicon glyph="minus" /> ,
                    onClick: () => this.updateCart(-1),
                },
                buttonTwo: {
                    styles: {
                        display: "inline-block", padding: "6px", borderRadius: "100px",
                    },
                    onClick: () => this.updateCart(1),
                },
            }
        }
    }
    updateCart = num => {
        const recipe = this.state.recipe
        recipe.cartTotal += num
        this.props.updateCart(recipe)
    }

    inputOnChange = event => {
        const input = this.state.input
        input.value = event.target.value
        this.setState({ input })
    }

    inputBlur = event => {
        this.updateCart(this.state.input.value - this.state.recipe.cartTotal)
    }

    render() {
        return (
            <div className = "cartButtonDiv" style={{ margin: "20px 5px 0px",display: "inline-block", height: "60px", width: "50%", marginLeft: "5px"}}>
                <button
                    className="myBtn"
                    style={this.state.buttonOne.styles}
                    children={
                        <div>
                            {this.state.buttonOne.children}
                        </div>}
                    onClick={this.state.buttonOne.onClick}
                >

                </button>
                <FormControl
                    style={this.state.input.style}
                    type="text"
                    value={this.state.input.value}
                    onChange={this.inputOnChange}
                    onBlur={this.inputBlur}
                />
                <button
                    className="myBtn"
                    style={this.state.buttonTwo.styles}
                    onClick={this.state.buttonTwo.onClick}
                    children= {<Glyphicon glyph="plus" />}
                />
            </div>
        )
    }
}

export default cartButton;