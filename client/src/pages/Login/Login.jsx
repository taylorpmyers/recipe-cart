import React, { Component } from 'react';
import API from "../../utils/API";
import { Row, Tab, Nav, NavItem, FormControl, FormGroup } from 'react-bootstrap';
import "./login.css"

class Login extends Component {
    state = {
        usernameLoginInput: "",
        passwordLoginInput: "",
        usernameSignupInput: "",
        passwordSignupInput: "",
        repeatSignupInput: "",
        valadationLogin: "",
        valadationSignup: "",
        success: "none"
    }
    handleChange = event => {
        let value = event.target.id
        this.setState({ [value]: event.target.value })
    }
    resetForm = () => {
        this.setState({
            usernameLoginInput: "",
            passwordLoginInput: "",
            usernameSignupInput: "",
            passwordSignupInput: "",
            repeatSignupInput: "",
            valadationLogin: "",
            valadationSignup: "",
            success: "hidden",
        })
    }

    login = (event,button) => {
        event.preventDefault()
        let user,password
        if(button === "demo"){
            user = "demo"
            password = "demo"
        } else {
            user =  this.state.usernameLoginInput
            password = this.state.passwordLoginInput
        }
        API.getUser({
            user: user,
            password: password,
        })
            .then(res => {
                if (typeof (res.data) === "string") {
                    this.setState({ valadationLogin: res.data })
                } else {
                    this.props.redirect(res.data, this.props.location.from)
                }
            })
            .catch(err => console.log(err));
    }
    signup = event => {
        event.preventDefault()
        if (!this.regexCheck(this.state.usernameSignupInput) || !this.regexCheck(this.state.passwordSignupInput) || !this.regexCheck(this.state.repeatSignupInput)) {
            this.resetForm()
            this.setState({ valadationSignup: "Username and Password must be made of letters and numbers only" })
        } else if (this.state.usernameSignupInput.length < 3 || this.state.passwordSignupInput.length < 3 || this.state.repeatSignupInput.length < 3) {
            this.resetForm()
            this.setState({ valadationSignup: "Username and Password must be more than 2 characters" })
        } else if (this.state.passwordSignupInput !== this.state.repeatSignupInput) {
            this.setState({
                valadationSignup: "Passwords do not match!",
                passwordSignupInput: "",
                repeatSignupInput: ""
            })
        } else {
            API.saveUser({
                user: this.state.usernameSignupInput,
                password: this.state.passwordSignupInput,
                cart: [],
            })
                .then(res => {
                    this.resetForm()
                    this.setState({ success: "block" })
                })
                .catch(err => console.log(err));
        }
    }


    regexCheck = str => {
        const regex = /^([0-9]|[a-z])+([0-9a-z]+)$/i
        return regex.test(str);
    }

    render() {
        return (
            <div id = "loginHolder">
                <div id="tabDiv">
                    <Tab.Container id="tabContainer" defaultActiveKey="first">
                        <Row>

                            <Nav bsStyle="pills" >
                                <NavItem eventKey="first">Login</NavItem>
                                <NavItem eventKey="second">Sign Up!</NavItem>
                            </Nav>


                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <form>
                                        <FormGroup style = {{textAlign: "center"}}>
                                            <FormControl
                                                id="usernameLoginInput"
                                                type="text"
                                                value={this.state.usernameLoginInput}
                                                placeholder="Username"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl
                                                id="passwordLoginInput"
                                                type="password"
                                                value={this.state.passwordLoginInput}
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                            <p style={{ color: "red", width: "85%", margin: "0 auto" }}>{this.state.valadationLogin}</p>
                                            <button style={{ display: "inline-block", marginRight: "15px"}} className = "myBtn" children="login" onClick={(event) => this.login(event,"login")} />
                                            <button  style={{ display: "inline-block"}} className = "myBtn" children="demo" onClick={(event) => this.login(event,"demo")} />

                                            <FormControl.Feedback />
                                        </FormGroup>

                                    </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <form>
                                        <FormGroup

                                        >
                                            <FormControl
                                                id="usernameSignupInput"
                                                type="text"
                                                value={this.state.usernameSignupInput}
                                                placeholder="Username"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl
                                                id="passwordSignupInput"
                                                type="password"
                                                value={this.state.passwordSignupInput}
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl
                                                id="repeatSignupInput"
                                                type="password"
                                                value={this.state.repeatSignupInput}
                                                placeholder="Repeat Password"
                                                onChange={this.handleChange}
                                            />

                                            <p style={{ color: "red", width: "85%", margin: "0 auto" }}>{this.state.valadationSignup}</p>
                                            <p style={{ color: "blue", width: "85%", margin: "0 auto", display: this.state.success }}>Thank you for signing up!</p>
                                            <button className = "myBtn" children="Sign Up" onClick={(event) => this.signup(event)} />

                                            <FormControl.Feedback />
                                        </FormGroup>

                                    </form>
                                </Tab.Pane>
                            </Tab.Content>

                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}

export default Login;