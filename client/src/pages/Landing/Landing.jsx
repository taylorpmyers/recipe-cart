import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import API from '../../utils/API'
import './landing.css'
import photo from "../../utils/images/landingPageImage.png"



class Landing extends Component {
    demo = () => {
        API.getUser({user: "demo",password: "demo"})
            .then(res => this.props.redirect(res.data))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Grid id = "landingDiv" style = {{minWidth: "100vw", minHeight: "100vh",background: "#E3E3E3",textAlign: "center"}}>
                <Row style = {{marginTop: "80px"}}>
                    <Col  xs={6} sm= {6}>
                        <img alt = "robot checking out groceries" src = {photo} style = {{width: "80%",height: "auto",}}/>
                    </Col>
                    <Col id = "landingWords"style = {{marginTop: "40px"}}xs={6} sm = {6}>
                        <h3 id = "landingHeading">
                            Automate Your Walmart Online Grocery Shopping!
                        </h3>
                        <h5 id = "landingText" >Create recipes and add the ingredients to your grocery.walmart account!</h5>
                        <button style = {{marginRight: "15px"}}className = "myBtn" children="Demo" onClick = {this.demo}/>
                        <button className = "myBtn"  children="Sign Up/Login" onClick = {() => window.location.href = '/login'}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Landing;