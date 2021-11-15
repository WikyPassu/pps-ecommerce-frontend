import React, { useState } from 'react';
import './LoginModal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
//import { useHistory } from 'react-router';
import ClienteService from '../../../servicios/ClienteService';
import UtilsService from '../../../servicios/UtilsService';

const initialValuesFormLogin = {
    correo:"",
    clave:""
}

// const initialValuesFormRegistracion = {
//     //"_id":"cli02",
//     "nombre":"",
//     "apellido":"",
//     "dni":null,
//     "correo":"",
//     "clave":"",
//     "domicilio":"",
//     "localidad":"",
//     "telefono":null,
//     "codigoPostal":"",
//     "perrito":[],
//     "estado":"ACTIVO"
// }

const initialValuesFormRegistracion = {
    "nombre": "",
    "apellido": "",
    "dni": 0,
    "correo": "",
    "clave": "",
    "domicilio": "",
    "localidad": "",
    "telefono": 0,
    "codigoPostal": 0,
    "perrito": [],
    "estado": "ACTIVO"
};

export default function LoginModal(props) {
    const [modoRegistracion, setModoRegistracion] = useState(false);
    const [formLogin, setFormLogin] = useState(initialValuesFormLogin);
    const [formRegistracion, setFormRegistracion] = useState(initialValuesFormRegistracion);

    //const history = useHistory();

    const cambiarModo = () => {
        setModoRegistracion(!modoRegistracion);
    }

    const handlerChangeLogin = (e) => {
        e.preventDefault();
        const {value,name} = e.target;

        setFormLogin((formLogin)=>{
            return {...formLogin, [name]:value};
        })
    }

    const handlerChangeRegistracion = (e) => {
        e.preventDefault();
        const {value,name} = e.target;

        setFormRegistracion((formRegistracion)=>{
            return {...formRegistracion, [name]:value};
        })
    }

    const handlerSubmitLogin = (e) => {
        e.preventDefault();
        UtilsService.setLoading(true);
        ClienteService.login(formLogin.correo,formLogin.clave)
        .then(()=>{
            UtilsService.setLoading(false);
            window.location.reload();
        });
    }

    const handlerSubmitRegistracion = (e)=>{
        e.preventDefault();
        console.log("forRegistracion",formRegistracion)
        ClienteService.signUp(formRegistracion)
        .then(()=>{
            console.log("usuarioLogeado",ClienteService.getUsuario())
            window.location.reload();
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            className="login-modal">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modoRegistracion ? "Registrarse" : "Iniciar Sesión"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={modoRegistracion ? handlerSubmitRegistracion : handlerSubmitLogin}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" onChange={modoRegistracion? handlerChangeRegistracion : handlerChangeLogin} name="correo" placeholder="Ingrese correo" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label varaint="pink">Contraseña</Form.Label>
                                <Form.Control type="password" onChange={modoRegistracion? handlerChangeRegistracion : handlerChangeLogin} name="clave" placeholder="Ingrese contraseña" />
                            </Form.Group>
                        </Col>
                    </Row>
                    {modoRegistracion ?
                        <>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label varaint="pink">Confirmar contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Ingrese contraseña" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control name="nombre" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control name="apellido" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control name="dni" onChange={handlerChangeRegistracion} type="number" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Domicilio</Form.Label>
                                        <Form.Control name="domicilio" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Localidad</Form.Label>
                                        <Form.Control name="localidad" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Codigo Postal</Form.Label>
                                        <Form.Control name="codigoPostal" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control name="telefono" onChange={handlerChangeRegistracion} type="number" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={cambiarModo} variant="link">¿Ya tenés una cuenta? <b>Iniciá sesión</b></Button>
                                </Col>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={cambiarModo} variant="link">¿No tenés cuenta? <b>Registrate ahora</b></Button>
                                </Col>
                            </Row>
                        </>
                    }
                    <br />
                    <Button onClick={props.onHide} variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
}