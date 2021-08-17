import React, { Component } from 'react';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            show: false,
            editshow: false
        };
    }

    state = {
        id: 0,
        name: "",
        email: "",
        password: "",
        user_type: ""
    };

    createClick() {
        let usrInfo = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            user_type: this.state.user_type

        };
        console.log(this.state.name);
        console.log(this.state.email);


        fetch("https://localhost:5001/user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(usrInfo)
        })
            .then(res => res.json())
            .then((result) => {

            }, (error) => {
                alert('Failed');
            })
        this.setState({ show: false })
        window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("https://localhost:5001/user", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                user_type: this.state.user_type

            })
        })
            .then(res => res.json())
            .then((result) => {

            },
                (error) => {
                    alert('Failed');
                })
        this.setState({ editshow: false })
        window.location.reload();
    }

    deleteUsr(empid){
        if(window.confirm('Are you sure?')){
            fetch("https://localhost:5001/user/"+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
        window.location.reload();
    }





    showModal() {
        this.setState({ show: true })
    }

    showClose() {
        this.setState({ show: false })
    }

    showEditModal() {
        this.setState({ editshow: true })
    }

    showEditClose() {
        this.setState({ editshow: false })
    }

    componentDidMount() {


        fetch("https://localhost:5001/user")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })

            });

    }


    render() {

        const { items } = this.state;

        return (
            <Container>
                <Table striped bordered hover style={tablestyle}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Şifre</th>
                            <th>Kullanıcı yetkisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.user_type}</td>
                                <td><Button variant="primary" onClick={() => this.setState({
                                    editshow: true,
                                    id: item.id, name: item.name, email: item.email,
                                    password: item.password, user_type: item.user_type
                                })}>Düzenle </Button>
                                    <Button variant="danger" style={{ marginLeft: '20px' }} onClick={()=>this.deleteUsr(item.id)} >Sil</Button></td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.showClose.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Kullanıcı Ekle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="number" placeholder="Id Giriniz." onChange={e => this.setState({ id: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>İsim</Form.Label>
                                <Form.Control type="text" placeholder="İsim Giriniz." onChange={e => this.setState({ name: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email adresi giriniz." onChange={e => this.setState({ email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Şifre</Form.Label>
                                <Form.Control type="password" placeholder="Şifre Giriniz." onChange={e => this.setState({ password: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kullanıcı Yetkisi</Form.Label>
                                <Form.Control type="text" placeholder="Yetki belirleyin." onChange={e => this.setState({ user_type: e.target.value })} />
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.showClose.bind(this)}>
                            Kapat
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.createClick.bind(this)}>
                            Oluştur
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.editshow} onHide={this.showEditClose.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Kullanıcı Ekle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>İsim</Form.Label>
                                <Form.Control type="text" placeholder="İsim Giriniz." value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email adresi giriniz." value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Şifre</Form.Label>
                                <Form.Control type="text" placeholder="Şifre Giriniz." value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Kullanıcı Yetkisi</Form.Label>
                                <Form.Control type="text" placeholder="Yetki belirleyin." value={this.state.user_type} onChange={e => this.setState({ user_type: e.target.value })} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.showEditClose.bind(this)}>
                            Kapat
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
                            Kaydet
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="primary" onClick={this.showModal.bind(this)}>Kullanıcı Ekle</Button>
            </Container>



        );

    }
}

const tablestyle = {

    marginTop: '100px',

};