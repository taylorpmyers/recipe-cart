import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import API from "../../utils/API";
import Modal from '../modal/modal'
import Select from 'react-select'

class productModal extends Component {
  state = {
    name: "",
    amount: "",
    categoryOption: "",
    measurementOption: "",
  }

  handleChange = event => {
    let value = event.target.id
    this.setState({ [value]: event.target.value })
  }

  handleSelect = name => value => {
    this.setState({ [name]: value })
  }

  addProduct = () => {
    const newProduct = {
      name: this.state.name,
      category: this.state.categoryOption.value,
      measurement: this.state.measurementOption.value,
      amount: Number(this.state.amount),
      user: this.props.user._id
    }
    API.saveProduct(newProduct)
      .then(res => {
        this.props.addProduct(res.data)
      }
      )
      .catch(err => console.log(err));

  }

  render() {
    return (
      <Modal
        fade={"false"}
        animation={false}
        show={this.props.show}
        onHide={this.props.onHide}
        style={{ background: `url(https://timedotcom.files.wordpress.com/2014/12/141224_em_walmart_12.jpg) no-repeat center center`, maxWidth: "100%", height: "200px", backgroundSize: "cover" }}
        title={"Add new product"}
        body={
          <div>
            <FormControl
              id="name"
              type="text"
              placeholder="Product Name"
              value={this.state.name}
              onChange={this.handleChange}>
            </FormControl>
            <br />
            <Select
              placeholder="Category e.g. Vegetable"
              value={this.state.categoryOption}
              onChange={this.handleSelect('categoryOption')}
              options={[
                { key: "optionBaking", value: "baking", label: "Baking", },
                { key: "optionDairy", value: "dairy", label: "Dairy" },
                { key: "optionFruit", value: "fruit", label: "Fruit" },
                { key: "optionGrain", value: "grain", label: "Grain" },
                { key: "optionOil", value: "oil", label: "Oil" },
                { key: "optionOther", value: "other", label: "Other" },
                { key: "optionProtein", value: "protein", label: "Protein" },
                { key: "optionSpices", value: "spice", label: "Spice" },
                { key: "optionVegetable", value: "vegetable", label: "Vegetable" },
              ]}
            />
            <br />
            <Select
              placeholder="Measurement"
              value={this.state.measurementOption}
              onChange={this.handleSelect("measurementOption")}
              options={[
                { key: "optionOunces", value: "oz", label: "Ounces" },
                { key: "optionGrams", value: "g", label: "Grams" },
                { key: "optionMilliliter", value: "ml", label: "Milliliter" },
                { key: "optionFluidOunces.", value: "fl oz.", label: "Fluid Ounces." },
                { key: "optionEach", value: "whole", label: "Each/Whole" }
              ]}
            />
            <br />
            <FormControl
              id="amount"
              type="text"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

        }
        footer={
          <div>
            <button className = "myBtn" onClick={this.props.onHide}>Close</button>
            {" "}
            <button className = "myBtn" onClick={this.addProduct}>Add Product</button>
          </div>
        }>

      </Modal>
    );
  }
}
export default productModal;

