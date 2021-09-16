import React from 'react';
import './AgregarProductoModal.css';
import { Modal, Button, Form } from 'react-bootstrap';


export default function AgregarProductoModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Producto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nombre del producto" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese descripcion del producto" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Seleccionar categoria</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Button onClick={props.onHide} variant="primary" type="submit">
                        Aceptar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}