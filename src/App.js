import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Users } from './Users';
import { Home } from './Home';
import { Login } from './Login';
import { Test } from './Test';
import { Admin } from './Admin';
import React, {  Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';


export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  render(){
    return (
      <BrowserRouter>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">Spark Proje
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Ana Sayfa</Nav.Link>
                <Nav.Link href="/test">Kesinti Tablosu</Nav.Link>
                <Nav.Link href="/admin">Admin Paneli</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">
                  {this.state.isLoggedIn ? (
                    <Button variant="danger" href="/home"> Çıkış </Button>

                  ) : (
                    <Button variant="success" href="/login"> Giriş Yap </Button>
                  )}

                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route path='/users' component={Users} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/test' component={Test} />
          <Route path='/admin' component={Admin} />
        </Switch>

      </BrowserRouter>
    );
  }
}
export default App;
