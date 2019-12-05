import React from 'react';
import { Col, Glyphicon } from 'react-bootstrap';
import CartButton from '../cartButton/cartButton';

const recipeDiv = props => {
  return (
    <Col className="recipeDiv" xs={12} sm={6} md={4} lg={4}>
      <div className="contentHolder">
        <img onClick={() => props.onClick(props.index)} alt={props.recipe.name} src={props.recipe.src} />
        <p onClick={() => props.onClick(props.index)}>{props.recipe.name}</p>
        <CartButton recipe={props.recipe} updateCart={props.updateCart} />
        <div style ={{textAlign:"center", display:"inline"}} >
          <button className = "myBtn" onClick = {() => props.deleteRecipe(props.recipe)} style = {{ borderRadius: "100px", padding: "12px" ,margin: "0px 5px"}}>
            <Glyphicon glyph="trash" />
          </button>
          <button className = "myBtn" onClick={() => props.onClick(props.index)} style = {{ borderRadius: "100px",padding: "12px" ,margin: "0px 5px"}}>
            <Glyphicon glyph="open" />
          </button>
        </div>
      </div>
    </Col>
  );
}

export default recipeDiv;