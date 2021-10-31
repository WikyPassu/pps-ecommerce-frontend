import React, { useState } from 'react';
import './LoginModal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';


export default function LoginModal(props) {
    const [modoRegistracion, setModoRegistracion] = useState(false);

    const cambiarModo = () => {
        setModoRegistracion(!modoRegistracion);
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            className="login-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modoRegistracion ? "Registrarse" : "Iniciar Sesión"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese correo" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label varaint="pink">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese contraseña" />
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
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control type="number" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Domicilio</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Localidad</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Codigo Postal</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese correo" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="number" placeholder="Ingrese correo" />
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