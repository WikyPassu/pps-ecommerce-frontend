import React, { useState } from 'react';
import './FormPrecioEnvioModal.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import EnviosService from '../../../../../servicios/EnviosService';

const initialValuesElemento = {
    localidad: "",
    precio:""
};

export default function FormPrecioEnvioModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);

    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
        });
    }

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;

    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? EnviosService.modifyPrecioEnvios(elemento) : EnviosService.addPrecioEnvios(elemento);
        onHide();
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {!modificar ? "Agregar Localidad" : "Modificar Localidad"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="nombre">Localidad</Form.Label>
                            <Form.Control
                                name="localidad"
                                maxLength="30"
                                type="text"
                                value={elemento.localidad}
                                onChange={handleChange}
                                placeholder="Localidad" />
                            {validarInputText(elemento.localidad)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="existencia">Precio</Form.Label>
                            <Form.Control
                                name="precio"
                                min="0"
                                value={elemento.precio}
                                onChange={handleChange}
                                type="number"
                                placeholder="Precio" />
                            {validarInputNumber(elemento.precio)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <br />
                            <Button type="submit" size="lg">Guardar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}