import React, { useState } from 'react';
import './FormEmpleadoModal.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import EmpleadoService from '../../../../../servicios/EmpleadoService';

const initialValuesElemento = {
    "nombre": "",
    "apellido": "",
    "dni": "",
    "correo": "",
    "clave": "",
    "tipo": "EMPLEADO"
};


export default function FormEmpleadoModal({ elementoParaModificar, onHide, show }) {
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
        (modificar === true) ? EmpleadoService.modifyEmpleado(elemento) : EmpleadoService.addEmpleado(elemento);
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
                    {!modificar ? "Alta Empleado" : "Modificar Empleado"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                maxLength="30"
                                type="text"
                                required
                                value={elemento.nombre}
                                onChange={handleChange}
                                placeholder="Ingrese nombre" />
                            {validarInputText(elemento.nombre)}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="apellido">Apellido</Form.Label>
                            <Form.Control
                                name="apellido"
                                maxLength="20"
                                type="text"
                                required
                                value={elemento.apellido}
                                onChange={handleChange}
                                placeholder="Ingrese apellido" />
                            {validarInputText(elemento.apellido)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="correo">Correo</Form.Label>
                            <Form.Control
                                name="correo"
                                maxLength="30"
                                type="email"
                                required
                                value={elemento.correo}
                                onChange={handleChange}
                                placeholder="Ingrese Correo" />
                            {validarInputText(elemento.correo)}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="clave">Clave</Form.Label>
                            <Form.Control
                                name="clave"
                                maxLength="20"
                                type="password"
                                required
                                value={elemento.clave}
                                onChange={handleChange}
                                placeholder="Ingrese clave" />
                            {validarInputText(elemento.clave)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="dni">DNI</Form.Label>
                            <Form.Control
                                name="dni"
                                type="number"
                                min="10000000"
                                max="99999999"
                                required
                                value={elemento.dni}
                                onChange={handleChange}
                                placeholder="Ingrese dni" />
                            {validarInputNumber(elemento.dni)}
                        </Form.Group>
                        <Form.Group as={Col} sm={4}>
                            <Form.Label htmlFor="tipo">Tipo de Usuario</Form.Label>
                            <Form.Select name="tipo" onChange={handleChange} value={elemento.tipo}>
                                <option value="EMPLEADO">EMPLEADO</option>
                                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            </Form.Select>
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