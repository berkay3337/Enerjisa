import React, { Component } from "react";
import { Container, Button, Row, Col, Form, Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {Home} from './Home';

var temp = [];
var users = [];
var i = 0;
export class Login extends Component {
    state = {
        val: "",
        pass: "",
        alert: false,
        control: false,
        isLoggedIn: false,
    };

    closeAlert() {
        this.setState({ alert: false });
    }

    loginControl() {
        fetch("https://localhost:5001/user/"+ this.state.val+"/"+this.state.pass)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    items: json,
                });
                temp = JSON.stringify(json);
                JSON.parse(temp, (key, value) => {
                    if (typeof value === "string") {
                        users[i] = value;
                        i++;
                    }
                });
                   
                    if (users[1] === this.state.val && users[2] === this.state.pass) {
                        if(users[3]==="admin"){
                        window.sessionStorage.setItem("admin", true);
                        window.sessionStorage.setItem("name", users[0]);
                        window.sessionStorage.setItem("isLoggedIn", true);
                        }
                        if(users[3]==="user"){
                            window.sessionStorage.setItem("user", true);
                            window.sessionStorage.setItem("name", users[0]);
                            window.sessionStorage.setItem("isLoggedIn", true);
                            }
                        ReactDOM.render(<BrowserRouter><Redirect to='/home'/></BrowserRouter>, document.getElementById('root'));
                        window.location.reload();
                    } else {
                        this.setState({ alert: true });        
                    }
                
            });
    }

    render() {
        return (
            <Container>
                {this.state.alert ? (
                    <Alert
                        variant="danger"
                        style={alertstyle}
                        onClose={this.closeAlert.bind(this)}
                        dismissible
                    >
                        <Alert.Heading>Hatalı Giriş!</Alert.Heading>
                        <p>Lütfen Tekrar Deneyiniz</p>
                    </Alert>
                ) : 
                    console.log("alert")
                )}
                {window.sessionStorage.getItem("isLoggedIn") ? (
                    console.log()
                ) : (
                    <Row>
                        <Col md={{ span: 3, offset: 4 }}>
                            <Form style={formstyle}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email adresinizi girin."
                                        onChange={(e) => this.setState({ val: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Şifre</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Şifre"
                                        onChange={(e) => this.setState({ pass: e.target.value })}
                                    />
                                </Form.Group>
                                <ReCAPTCHA
                                    sitekey="clientKey"
                                    style={{ marginLeft: "95px" }}
                                />
                                <br></br>
                                <Button
                                    variant="primary"
                                    style={buttonstyle}
                                    onClick={this.loginControl.bind(this)}
                                >
                                    Giriş Yap
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                )}
                <BrowserRouter>
                <Switch>
                    <Route path='/home' component={Home}/>
                </Switch>
                </BrowserRouter>

                          console.log("alert")    
                        )}
                <Row>
                    <Col md={{ span: 3, offset: 4 }}>

                        <Form style={formstyle}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email adresinizi girin."  onChange={e => this.setState({ val: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Şifre</Form.Label>
                                <Form.Control type="password" placeholder="Şifre"  onChange={e => this.setState({ pass: e.target.value })} />
                            </Form.Group>
                            <ReCAPTCHA
                                sitekey="clientkey"
                                style={{ marginLeft: '95px' }}

                            />
                            <br></br>
                            <Button variant="primary" style={buttonstyle} onClick={this.loginControl.bind(this)} >
                                Giriş Yap
                            </Button>
                        </Form>

                    </Col>
                </Row>

            </Container>
        );
    }
}

const formstyle = {
    marginTop: "200px",
    width: "500px",
};

const buttonstyle = {
    marginLeft: "170px",
    width: "150px",
};

const alertstyle = {
    width: "700px",
    marginLeft: "330px",
};
