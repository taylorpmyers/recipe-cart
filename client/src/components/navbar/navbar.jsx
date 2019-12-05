import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import "./navbar.css"
import img from "../../utils/images/logo.png"

const Navigation = props => {
  let navlink;
  if (props.auth) {
    navlink = <NavItem onClick={props.signout}><p className="authBtn navLink" children="Signout" /></NavItem>
  } else {
    navlink = <LinkContainer to="/login"><NavItem className="navLink"><p className="authBtn" children="Login" /></NavItem></LinkContainer>;
  }
  let cartTotal = 0
  for (let i = 0; i < props.cart.length; i++) {
    cartTotal += props.cart[i].cartTotal
  }
  return (
    <Navbar sticky="top">
      <Navbar.Header >
        <Navbar.Brand>
          <LinkContainer to="/landing">
            <img src={img} alt="logo" />
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>

      <Nav>
        <LinkContainer to="/cart">
          <NavItem className="navLink" eventKey={3}>
            <Glyphicon glyph="shopping-cart" />
            <span id="circle">{cartTotal}</span>
          </NavItem>
        </LinkContainer>
        {navlink}
        <NavItem className="asdf" >
          <LinkContainer to="/recipes">
            <p>Recipes</p>
          </LinkContainer>
        </NavItem>
      </Nav>



    </Navbar>

  );
}

export default Navigation;