import React from 'react';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

const IngredientList = props => {
  if (props.ingredients) {
    return (
      <ListGroup children={
        props.ingredients.map(ingredient => (
          <ListGroupItem style={{ overflow: "hidden" }}>
            <span >{ingredient.name}</span>
            <button className="myBtn" onClick={() => props.onClick(ingredient.name)}
              style={{
                float: "right", padding: "5px",
                borderRadius: "100px",
                backgroundColor: "darkslategray",
              }}>
              <Glyphicon glyph="remove" />
            </button>
          </ListGroupItem>
        ))
      }>
      </ListGroup >
    )
  }
}

export default IngredientList;