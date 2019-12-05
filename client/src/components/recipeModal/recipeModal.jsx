import React, { Component } from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';
import API from "../../utils/API";
import Select from 'react-select'
import Modal from '../modal/modal'
import Accordion from '../accordion/accordion'
import IngredientList from '../ingredientList/ingredientList'

class recipeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      newRecipe: {},
      amount: "",
      ingredientName: "",
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      let newRecipe = {}
      newRecipe.name = this.props.active.name
      newRecipe.src = this.props.active.src
      newRecipe.ingredients = this.props.active.ingredients || [{}]
      this.setState({ recipe: this.props.active, newRecipe: newRecipe })
    }
  }

  handleChange = event => {
    let newRecipe = this.state.newRecipe
    newRecipe[event.target.id] = event.target.value
    this.setState({ newRecipe })
  }
  handleIngredientChange = event => {
    const name = event.target.id
    this.setState({ [name]: event.target.value })
  }
  deleteIngredient = ingredient => {
    let newRecipe = this.state.newRecipe
    newRecipe.ingredients = newRecipe.ingredients.filter(each => each.name !== ingredient)
    this.setState({ newRecipe })
  }

  addIngredient = () => {
    const ingredient = {
      name: this.state.ingredientName,
      amount: Number(this.state.amount),
      product: this.state.selectedOption.value
    }
    let newRecipe = this.state.newRecipe
    newRecipe.ingredients ?
      newRecipe.ingredients.push(ingredient) :
      newRecipe.ingredients = [ingredient]
    this.setState({ newRecipe })
  }

  handleSelect = selectedOption => {
    this.setState({ selectedOption })
  }

  saveChanges = () => {
    const recipe = Object.assign(this.state.recipe, this.state.newRecipe)
    API.updateRecipe(recipe._id, recipe)
      .then(res => {
        this.setState({ recipe }, () => this.props.onHide())
      })
      .catch(err => console.log(err));
  }
  render() {
    let ingredientsList = " "
    if (this.state.newRecipe.ingredients) {
      ingredientsList = <IngredientList onClick={this.deleteIngredient.bind(this)} ingredients={this.state.newRecipe.ingredients} />
    }
    const { selectedOption } = this.state
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        style={{ background: `url(${this.state.newRecipe.src}) no-repeat center center`, maxWidth: "100%", height: "200px", backgroundSize: "cover" }}
        title={this.state.newRecipe.name}
        body={
          <Accordion
            id="accordion-controlled-example"
            activeKey={this.state.activeKey}
            onSelect={this.handleAccordion}
            body={[
              {
                title: "Recipe Name/URL",
                body:
                  <div>
                    <ControlLabel children="Recipe Name" />
                    <FormControl
                      id="name"
                      type="text"
                      placeholder="Recipe Name"
                      value={this.state.newRecipe.name}
                      onChange={this.handleChange}>
                    </FormControl>
                    <br />
                    <ControlLabel children="Recipe URL" />
                    <FormControl
                      id="src"
                      type="text"
                      placeholder="Recipe URL"
                      value={this.state.newRecipe.src}
                      onChange={this.handleChange}
                    />
                    <hr />
                  </div>
              }, {
                title: "Add Ingredient",
                body:
                  <div>
                    <Select
                      value={selectedOption}
                      onChange={this.handleSelect}
                      options={this.props.options}
                    />
                    <FormControl
                      style={{ width: "48%", margin: "2% 4% 2% 0%", display: "inline" }}
                      id="amount"
                      type="text"
                      placeholder="Amount"
                      value={this.state.amount}
                      onChange={this.handleIngredientChange}
                    />
                    {/* {this.state.productMeasurement} */}
                    <FormControl
                      style={{ width: "48%", margin: "2% 0%", display: "inline" }}
                      id="ingredientName"
                      type="text"
                      placeholder="Ingredient Name"
                      value={this.state.ingredientName}
                      onChange={this.handleIngredientChange}
                    />
                    <button className="myBtn" style={{ display: "block", margin: "0 auto" }} onClick={this.addIngredient}>Add ingredient</button>
                  </div>
              }, {
                title: "Ingredients",
                body: ingredientsList
              }
            ]}>
          </Accordion>
        }
        footer={
          <div>
            <button className="myBtn" onClick={this.props.onHide}>Close</button>
            {" "}
            <button className="myBtn" onClick={this.saveChanges}>Save changes</button>
          </div>
        }>
      </Modal>
    );
  }
}

export default recipeModal;