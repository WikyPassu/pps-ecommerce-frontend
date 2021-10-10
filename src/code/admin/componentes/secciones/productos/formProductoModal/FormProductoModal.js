import React, { useState } from 'react';
import './FormProductoModal.css';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import ProductoService from '../../../../../servicios/ProductoService';

export default function FormProductoModal({ produtoParaModificar, onHide, show }) {
    const modificar = produtoParaModificar !== undefined;
    const [producto, setProducto] = useState(produtoParaModificar || {
        codigo: new Date().getTime(),
        nombre: "",
        categoria: "",
        descripcion: "",
        imagen:"",
        stock: {
            existencia: 0,
            minimo: 0,
            maximo: 0
        },
        precio: 0
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        //validaciones


        //Guardar cambios
        if (name === "cantidadMaxima") {
            setProducto({
                ...producto,
                stock: { ...producto, existenciaMaxima: parseInt(value) }
            });
        }
        else if (name === "cantidadMinima") {
            setProducto({
                ...producto,
                stock: { ...producto, existenciaMinima: parseInt(value) }
            });
        }
        else if (name === "existencia") {
            setProducto({
                ...producto,
                stock: { ...producto, existencia: parseInt(value) }
            });
        }
        else if (name === "precio") {
            setProducto({
                ...producto,
                [name]: parseFloat(value)
            });
        }
        else if (name === "imagen") {
            if(files[0] !== undefined){
                const reader = new FileReader();
                console.log("asd112",files[0]);
                setProducto({
                    ...producto,
                    "imagen": reader.readAsDataURL(files[0])
                });
            }
        }
        else {
            setProducto({
                ...producto,
                [name]: value
            });
        }
    }

    const validarInputText = (valor) => {
        if (!valor.trim()) {
            return <Form.Text>Este campo no puede estar vacio</Form.Text>;
        }
        return;
    }

    const validarInputNumber = (valor) => {
        if (valor < 0) {
            return <Form.Text>Este campo no puede tener valores negativos</Form.Text>;
        }
        return;
    }

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
                            <Form.Control
                                name="categoria"
                                maxLength="20"
                                value={producto.categoria}
                                onChange={handleChange}
                                type="text"
                                placeholder="Ingrese categoria del producto" />
                            {validarInputText(producto.categoria)}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                            <Form.Control
                                name="descripcion"
                                maxLength="50"
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
                            <Form.Label htmlFor="cantidadMinima">Stock Minimo</Form.Label>
                            <Form.Control
                                name="cantidadMinima"
                                value={producto.existenciaMinima}
                                onChange={handleChange}
                                min="0"
                                type="number"
                                placeholder="Ingrese stock minimo del producto" />
                            {validarInputNumber(producto.existenciaMinima)}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="cantidadMaxima">Stock Maximo</Form.Label>
                            <Form.Control
                                name="cantidadMaxima"
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
                            <Form.Label>Imagen del producto</Form.Label>
                            <Form.Control name="imagen" onChange={handleChange} type="file" />
                            
                        </Form.Group>
                    </Row>
                    <Row>
                        <Image as={Col} style={{maxWidth:"300px"}} src={producto.imagen}/>
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