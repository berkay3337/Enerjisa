import React, { Component } from 'react';
import logo from './kys.jpg'
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './Login';

export class Home extends Component {

    logOut() {
        window.sessionStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <BrowserRouter>
                {window.sessionStorage.getItem('isLoggedIn') ? (
                    <Container>
                        {window.sessionStorage.getItem('isLoggedIn') ? (
                            <Row>
                                <Col md={{ span: 3, offset: 3 }}>
                                    <Card style={cardstyle}>
                                        <Card.Img variant="top" src={logo} />
                                        <Card.Body>
                                            <Card.Title>HOŞGELDİNİZ</Card.Title>
                                            <Card.Text>
                                                Çıkış yapmak için aşığıdaki butona tıklayabilirsiniz
                                            </Card.Text>
                                            <Button variant="danger" onClick={this.logOut.bind(this)}>Çıkış Yap</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                        ) : (
                            <Row>
                                <Col md={{ span: 3, offset: 3 }}>
                                    <Card style={cardstyle}>
                                        <Card.Img variant="top" src={logo} />
                                        <Card.Body>
                                            <Card.Title>HOŞGELDİNİZ</Card.Title>
                                            <Card.Text>
                                                Giriş yapmak için aşığıdaki butona tıklayabilirsiniz
                                            </Card.Text>
                                            <Button variant="primary" href='/login'>Giriş Yap</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )}

                    </Container>

                ) : (
                    console.log("")
                )}

                <Switch>
                    <Route path='/login' component={Login} />
                </Switch>
            </BrowserRouter>

        );
    }

}
const cardstyle = {
    width: '36rem',
    top: '100px',

};