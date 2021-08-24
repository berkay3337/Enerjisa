import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';
import { Login } from './Login';
import { PowerCut } from './PowerCut';
import { Admin } from './Admin';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    }
  }
  isLogin() {
    this.setState({ isLoggedIn: this.props.isLoggedIn });
    console.log(this.props.isLoggedIn);
  }
  logOut() {
    window.sessionStorage.clear();
    window.location.reload();

  }
  
  render() {
    return (
      <BrowserRouter>
        {window.sessionStorage.getItem('isLoggedIn') ? (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/home">KYS
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                  <Nav.Link href="/home">Ana Sayfa</Nav.Link>

                  {window.sessionStorage.getItem('isLoggedIn') ? (
                    <Nav.Link href="/powercut">Kesinti Tablosu</Nav.Link>
                  ) : (
                    console.log()
                  )}

                  {window.sessionStorage.getItem('admin') ? (
                    <Nav.Link href="/admin">Admin Paneli</Nav.Link>
                  ) : (
                    console.log()
                  )}

                </Nav>
                <Nav>
                  <Nav.Link>{window.sessionStorage.getItem('name')}</Nav.Link>

                  {window.sessionStorage.getItem('isLoggedIn') ? (
                    <Button variant="danger" onClick={this.logOut.bind(this)}  > Çıkış </Button>

                  ) : (
                    <Button variant="success" href="/login"> Giriş Yap </Button>
                  )}

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        ) : (
          console.log("")
        )}

        {window.sessionStorage.getItem('admin') ? (
          <Switch>
            <Route path='/admin' component={Admin} />
          </Switch>

        ) : (
          console.log("")
        )}
        {window.sessionStorage.getItem('admin') ? (
          <Switch>
            <Route path='/powercut' component={PowerCut} />
          </Switch>

        ) : (
          console.log("")
        )}
        {window.sessionStorage.getItem('user') ? (
          <Switch>
            <Route path='/powercut' component={PowerCut} />
          </Switch>

        ) : (
          console.log("")
        )}
        {window.sessionStorage.getItem('isLoggedIn') ? (
          <Switch>
            <Route path='/home' component={Home} />
          </Switch>
        ) : (
          console.log("")
        )}

        {window.sessionStorage.getItem('isLoggedIn') ? (
          console.log("")
        ) : (
          <Login/>
        )}


        <Switch>
          <Route path='/login' component={Login} />
        </Switch>

      </BrowserRouter>

    );
  }
}
export default App;
