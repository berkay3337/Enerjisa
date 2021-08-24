import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/tr'
import { Table, Container, Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
moment.locale('tr');


export class PowerCut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            items2: [],
            show: false,
            editshow: false,
            filter: false,
        };
    }

    state = {
        id: 0,
        starting_date: "",
        starting_time: "",
        finishing_date: "",
        finishing_time: "",
        interruption_reason: "",
        failure_reason: 0,
        fstarting_date: null,
        fstarting_time: null,
        ffinishing_date: null,
        ffinishing_time: null,
        finterruption_reason: null,
        ffailure_reason: 0
    };



    componentDidMount() {
        var users = [];
        var temp = [];
        var id_tmp = [];
        var i = 0;
        var j = 0;

        fetch("https://localhost:5001/powercut")
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
                    if (typeof value === 'number') {

                        id_tmp[j] = value;
                        j++;
                    }

                });

                this.setState({ id: (id_tmp[(id_tmp.length) - 1]) + 1 });
            });

    }

    createInterruption() {
        var starting_date = new Date(this.state.starting_date + "T" + this.state.starting_time + ":00");
        var finishing_date = new Date(this.state.finishing_date + "T" + this.state.finishing_time + ":00");

        console.log(finishing_date);

        let pwrCutInfo = {

            starting_date: starting_date,
            finishing_date: finishing_date,
            interruption_reason: this.state.interruption_reason,
            failure_reason: this.state.failure_reason,
            id: this.state.id,

        };

        fetch("https://localhost:5001/powercut", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(pwrCutInfo)
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);

            }, (error) => {

            })
        //window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();
        var starting_date = new Date(this.state.starting_date + "T" + this.state.starting_time + ":00");
        var finishing_date = new Date(this.state.finishing_date + "T" + this.state.finishing_time + ":00");
        fetch("https://localhost:5001/powercut", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                starting_date: starting_date,
                finishing_date: finishing_date,
                interruption_reason: this.state.interruption_reason,
                failure_reason: this.state.failure_reason,
                id: this.state.id

            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);

            },
                (error) => {
                    alert('Failed');
                })

        this.setState({ editshow: false })
        //window.location.reload();
    }

    deletePwrCut(id) {
        if (window.confirm('Are you sure?')) {
            fetch("https://localhost:5001/powercut/" + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
        window.location.reload();
    }

    dateFilter() {
        var starting_date = new Date(this.state.fstarting_date + "T" + this.state.fstarting_time + ":00");
        var finishing_date = new Date(this.state.ffinishing_date + "T" + this.state.ffinishing_time + ":00");
        var starting_date2 = moment(starting_date).format("YYYY-MM-DDTLTS");
        var finishing_date2 = moment(finishing_date).format("YYYY-MM-DDTLTS");
        var ffailure_reason=this.state.ffailure_reason;
        if(ffailure_reason == null){
            ffailure_reason = 0;
             console.log(ffailure_reason);
        }
        
        var date = [];
        var temp = [];
        var i = 0;
        fetch("https://localhost:5001/powercut/" + starting_date2 + "/" + finishing_date2+"/"+this.state.finterruption_reason+"/"+ffailure_reason)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    items: json,
                });
                temp = JSON.stringify(json);
                JSON.parse(temp, (key, value) => {
                    if (typeof value === "string") {
                        date[i] = value;
                        i++;
                    }
                });


            });
        this.setState({filter:false});
        this.setState({starting_date:null});
        this.setState({starting_time:null});
        this.setState({finishing_date:null});
        this.setState({finishing_time:null});
        this.setState({finterruption_reason:null});
        this.setState({ffailure_reason:null})
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

    showFilter() {
        this.setState({ filter: true })
    }

    closeFilter() {
        this.setState({ filter: false })
    }


    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner animation="border" role="status" style={spinnerstyle}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        } else {
            return (

                <Container>

                    <Button variant="primary" onClick={this.showFilter.bind(this)} style={{ marginTop: '20px' }}>Filtrele</Button>
                    {window.sessionStorage.getItem('admin') ? (
                        <Button variant="primary" style={buttonstyle} onClick={this.showModal.bind(this)}>Kesinti Ekle</Button>

                    ) : (
                        console.log("")
                    )}
                    <Table striped bordered hover>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kesinti Başlangıç Tarihi</th>
                                <th>Kesinti Bitiş Tarihi</th>
                                <th>Kesinti Nedeni</th>
                                <th>Arıza Nedeni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{moment(item.starting_date).format('LLL')}</td>
                                    <td>{moment(item.finishing_date).format('LLL')}</td>
                                    <td>{item.interruption_reason}</td>
                                    <td>{item.failure_reason}</td>
                                    {window.sessionStorage.getItem('admin') ? (
                                        <td><Button variant="primary" onClick={() => this.setState({
                                            editshow: true,
                                            starting_date: moment(item.starting_date).format('YYYY-MM-DD'), starting_time: moment(item.starting_date).format('LT'), finishing_date: moment(item.finishing_date).format('YYYY-MM-DD'), finishing_time: moment(item.finishing_date).format('LT'), interruption_reason: item.interruption_reason,
                                            failure_reason: item.failure_reason, id: item.id
                                        })}>Düzenle</Button>
                                            <Button variant="danger" style={{ marginLeft: '20px' }} onClick={() => this.deletePwrCut(item.id)} >Sil</Button>
                                        </td>


                                    ) : (
                                        console.log("")
                                    )}
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <Modal show={this.state.show} onHide={this.showClose.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">Kesinti Ekle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Başlangıç Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" onChange={e => this.setState({ starting_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" onChange={e => this.setState({ starting_time: e.target.value })} />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Bitiş Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" onChange={e => this.setState({ finishing_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" onChange={e => this.setState({ finishing_time: e.target.value })} />
                                        </Col>
                                    </Row>

                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Nedeni</Form.Label>
                                    <Form.Select type="text" placeholder="Kesinti Nedeni Giriniz" onChange={e => this.setState({ interruption_reason: e.target.value })}>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                        <option>I</option>
                                        <option>J</option>
                                        <option>K</option>
                                        <option>L</option>
                                        <option>M</option>
                                        <option>N</option>
                                        <option>O</option>
                                        <option>P</option>
                                        <option>Q</option>
                                        <option>R</option>
                                        <option>S</option>
                                        <option>T</option>
                                        <option>U</option>
                                        <option>V</option>
                                        <option>W</option>
                                        <option>X</option>
                                        <option>Y</option>
                                        <option>Z</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Arıza Nedeni</Form.Label>
                                    <Form.Select type="number" placeholder="Arıza Nedeni Giriniz" onChange={e => this.setState({ failure_reason: e.target.value })} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>45</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.showClose.bind(this)}>
                                Kapat
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.createInterruption.bind(this)}>
                                Oluştur
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.editshow} onHide={this.showEditClose.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">Kesinti Ekle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Başlangıç Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" value={this.state.starting_date} onChange={e => this.setState({ starting_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" value={this.state.starting_time} onChange={e => this.setState({ starting_time: e.target.value })} />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Bitiş Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" value={this.state.finishing_date} onChange={e => this.setState({ finishing_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" value={this.state.finishing_time} onChange={e => this.setState({ finishing_time: e.target.value })} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Nedeni</Form.Label>
                                    <Form.Select type="text" placeholder="Kesinti Nedeni Giriniz" value={this.state.interruption_reason} onChange={e => this.setState({ interruption_reason: e.target.value })}>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                        <option>I</option>
                                        <option>J</option>
                                        <option>K</option>
                                        <option>L</option>
                                        <option>M</option>
                                        <option>N</option>
                                        <option>O</option>
                                        <option>P</option>
                                        <option>Q</option>
                                        <option>R</option>
                                        <option>S</option>
                                        <option>T</option>
                                        <option>U</option>
                                        <option>V</option>
                                        <option>W</option>
                                        <option>X</option>
                                        <option>Y</option>
                                        <option>Z</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Arıza Nedeni</Form.Label>
                                    <Form.Select type="number" placeholder="Arıza Nedeni Giriniz" value={this.state.failure_reason} onChange={e => this.setState({ failure_reason: e.target.value })} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>45</option>
                                    </Form.Select>
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

                    <Modal show={this.state.filter} onHide={this.closeFilter.bind(this)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">Filtreleme Ekranı</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Başlangıç Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" value={this.state.fstarting_date} onChange={e => this.setState({ fstarting_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" value={this.state.fstarting_time} onChange={e => this.setState({ fstarting_time: e.target.value })} />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Bitiş Tarihi</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="date" value={this.state.ffinishing_date} onChange={e => this.setState({ ffinishing_date: e.target.value })} />
                                        </Col>
                                        <Col>
                                            <Form.Control type="time" value={this.state.ffinishing_time} onChange={e => this.setState({ ffinishing_time: e.target.value })} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                              
                                <Form.Group className="mb-3">
                                    <Form.Label>Kesinti Nedeni</Form.Label>
                                    <Form.Select type="text" placeholder="Kesinti Nedeni Giriniz" value={this.state.finterruption_reason} onChange={e => this.setState({ finterruption_reason: e.target.value })}>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                        <option>G</option>
                                        <option>H</option>
                                        <option>I</option>
                                        <option>J</option>
                                        <option>K</option>
                                        <option>L</option>
                                        <option>M</option>
                                        <option>N</option>
                                        <option>O</option>
                                        <option>P</option>
                                        <option>Q</option>
                                        <option>R</option>
                                        <option>S</option>
                                        <option>T</option>
                                        <option>U</option>
                                        <option>V</option>
                                        <option>W</option>
                                        <option>X</option>
                                        <option>Y</option>
                                        <option>Z</option>
                                    </Form.Select>
                                </Form.Group>
                      
                                <Form.Group className="mb-3">
                                    <Form.Label>Arıza Nedeni</Form.Label>
                                    <Form.Select type="number" placeholder="Arıza Nedeni Giriniz" value={this.state.ffailure_reason} onChange={e => this.setState({ ffailure_reason: e.target.value })} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>45</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeFilter.bind(this)}>
                                Kapat
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.dateFilter.bind(this)}>
                                Filtrele
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            );
        }
    }
}



const buttonstyle = {

    marginLeft: '1190px',
    marginTop: '-20px'

};


const spinnerstyle = {

    marginTop: '450px',
    marginLeft: '700x',

};