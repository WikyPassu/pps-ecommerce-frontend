import React, { useState } from 'react';
import './FormConsumibleModal.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import ConsumibleService from '../../../../../servicios/ConsumibleService';

const initialValuesElemento = {
    _id: Date.now(),
    nombre: "",
    existencia: 0,
    existenciaMinima: 0,
    precioUnidad: 0,
};

export default function FormConsumibleModal({ elementoParaModificar, onHide, show }) {
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
        (modificar === true) ? ConsumibleService.modifyConsumible(elemento) : ConsumibleService.addConsumible(elemento);
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
                    {!modificar ? "Alta Consumible" : "Modificar Consumible"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                maxLength="20"
                                type="text"
                                value={elemento.nombre}
                                onChange={handleChange}
                                placeholder="Nombre del consumible" />
                            {validarInputText(elemento.nombre)}

                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="existencia">Existencia</Form.Label>
                            <Form.Control
                                name="existencia"
                                min="0"
                                value={elemento.existencia}
                                onChange={handleChange}
                                type="number"
                                placeholder="Existencia" />
                            {validarInputNumber(elemento.categoria)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="existencia">Existencia Minima</Form.Label>
                            <Form.Control
                                name="existenciaMinima"
                                min="0"
                                value={elemento.existenciaMinima}
                                onChange={handleChange}
                                type="number"
                                placeholder="Existencia Minima" />
                            {validarInputNumber(elemento.existenciaMinima)}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="existencia">Precio Unidad</Form.Label>
                            <Form.Control
                                name="precioUnidad"
                                min="0"
                                value={elemento.precioUnidad}
                                onChange={handleChange}
                                type="number"
                                placeholder="Precio Unidad" />
                            {validarInputNumber(elemento.precioUnidad)}
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