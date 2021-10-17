import React from 'react';
import './LoginModal.css';
import { Modal, Button, Form } from 'react-bootstrap';


export default function LoginModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            centered
            className="login-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Iniciar Sesion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese correo" />
                        {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label varaint="pink">Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Ingrese contraseña" />
                    </Form.Group>
                    <br />
                    <Button onClick={props.onHide} variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    );
}