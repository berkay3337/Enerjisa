import React, { Component } from 'react';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import {App} from "./App";




var temp = [];
var users = [];
var i = 0;
export class Login extends Component {

    state = {
        val: "",
        pass: "",
        alert: false,
        control: false,
    };

    closeAlert() {
        this.setState({ alert: false });
    }

    loginControl() {

        fetch("https://localhost:5001/user")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })

                temp = JSON.stringify(json);
                JSON.parse(temp, (key, value) => {
                    if (typeof value === 'string') {
                        users[i] = value;
                        i++;
                    }
                });
                console.log(users);
                console.log(this.state.val);
                console.log(users[5]);
                console.log(this.state.pass);

                for (var j = 1; j < users.length; j = j + 4) {

                    if (users[j] === this.state.val && users[j + 1] === this.state.pass) {

                        console.log("giriş başarılı");
                        break;
                        
                    



                    } else {
                        console.log("Hatalı Giriş");
                        this.setState({ alert: true });
                        console.log(this.state.alert);
                        break;

                    }
                }

            });

    }

    render() {

        return (
            <Container>
                
                {this.state.alert ? (
                    <Alert variant="danger" style={alertstyle} onClose={this.closeAlert.bind(this)} dismissible>
                        <Alert.Heading>Hatalı Giriş!</Alert.Heading>
                        <p>
                            Lütfen Tekrar Deneyiniz
                        </p>
                    </Alert>

                ) : (
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
    marginTop: '200px',
    width: '500px',
    

};

const buttonstyle = {
    marginLeft: '170px',
    width: '150px'

};

const alertstyle = {
    width: '700px',
    marginLeft:'330px'


};
