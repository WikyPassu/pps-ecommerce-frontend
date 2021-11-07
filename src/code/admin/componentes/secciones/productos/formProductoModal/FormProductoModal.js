import React, { useState } from 'react';
import './FormProductoModal.css';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import ProductoService from '../../../../../servicios/ProductoService';

const initialValuesProducto = {
    nombre: "",
    categoria: "comida",
    descripcion: "",
    imagen: "",
    existencia: 0,
    existenciaMinima: 0,
    existenciaMaxima: 0,
    estado: "HABILITADO",
    precio: 0
};

export default function FormProductoModal({ produtoParaModificar, onHide, show }) {
    const modificar = produtoParaModificar !== undefined;
    const [producto, setProducto] = useState(produtoParaModificar || initialValuesProducto);

    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(name,value);
        //Guardar cambios
        if (name === "existencia" || name === "existenciaMinima" || name === "existenciaMaxima") {
            console.log("name", name)
            setProducto({
                ...producto,
                [name]: parseInt(value)
            });
        }
        else if (name === "precio") {
            setProducto({
                ...producto,
                [name]: parseFloat(value)
            });
        }
        else {
            setProducto({
                ...producto,
                [name]: value
            });
        }
        // else if (name === "imagen") {
        //     if (files[0] !== undefined) {
        //         const reader = new FileReader();
        //         reader.onloadend = function () {
        //             setProducto({
        //                 ...producto,
        //                 "imagen": reader.result
        //             });
        //         }
        //         reader.readAsDataURL(files[0]);
        //     }
        // }
    }

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SEN ENVIO FORMULARIO", producto);
        (modificar === true) ? ProductoService.modifyProducto(producto) : ProductoService.addProducto(producto);
        onHide();
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {!modificar ? "Alta Producto" : "Modificar Producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                maxLength="20"
                                type="text"
                                value={producto.nombre}
                                onChange={handleChange}
                                placeholder="Ingrese nombre del producto" />
                            {validarInputText(producto.nombre)}

                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">

                            <Form.Label htmlFor="categoria">Categoria</Form.Label>
                            <Form.Select name="categoria" onChange={handleChange} value={producto.categoria}>
                                <option value="comida">Comida</option>
                                <option value="cama">Cama</option>
                                <option value="higiene">Higiene</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                            <Form.Control
                                name="descripcion"
                                maxLength="100"
                                value={producto.descripcion}
                                onChange={handleChange}
                                as="textarea"
                                placeholder="Ingrese descripcion del producto (opcional)" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="existencia">Existencia</Form.Label>
                            <Form.Control
                                name="existencia"
                                value={producto.existencia}
                                onChange={handleChange}
                                min="0"
                                type="number"
                                placeholder="Ingrese existencia del producto" />
                            {validarInputNumber(producto.existencia)}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="existenciaMinima">Stock Minimo</Form.Label>
                            <Form.Control
                                name="existenciaMinima"
                                value={producto.existenciaMinima}
                                onChange={handleChange}
                                min="0"
                                type="number"
                                placeholder="Ingrese stock minimo del producto" />
                            {validarInputNumber(producto.existenciaMinima)}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="existenciaMaxima">Stock Maximo</Form.Label>
                            <Form.Control
                                name="existenciaMaxima"
                                value={producto.existenciaMaxima}
                                onChange={handleChange}
                                min="0"
                                type="number"
                                placeholder="Ingrese stock maximo del producto" />
                            {validarInputNumber(producto.existenciaMaxima)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="precio">Precio</Form.Label>
                            <Form.Control
                                name="precio"
                                value={producto.precio}
                                onChange={handleChange}
                                min="0"
                                step=".01"
                                type="number"
                                placeholder="Ingrese precio del producto" />
                            {validarInputNumber(producto.precio)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="precio">Estado</Form.Label>
                            <Form.Select name="estado" onChange={handleChange} value={producto.estado}>
                                <option value="HABILITADO">HABILITADO</option>
                                <option value="DESHABILITADO">DESHABILITADO</option>
                                <option value="SIN_STOCK">SIN STOCK</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Imagen del producto</Form.Label>
                            {/* <Form.Control name="imagen" onChange={handleChange} type="file" /> */}
                            <Form.Control name="imagen" value={producto.imagen} onChange={handleChange} placeholder="Ingrese URL de imagen" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Image as={Col} style={{ maxWidth: "300px" }} src={producto.imagen} />
                    </Row>
                    <br />
                    <Button variant="primary" type="submit">
                        {modificar ? "Modificar" : "Agregar"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}