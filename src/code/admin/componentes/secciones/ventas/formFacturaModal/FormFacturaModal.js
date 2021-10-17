import React, { useEffect, useState } from 'react';
import './FormFacturaModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Image } from 'react-bootstrap';
import FacturasService from '../../../../../servicios/VentasService';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping, MdMail } from 'react-icons/md';
import ProductoService from '../../../../../servicios/ProductoService';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';

const initialValuesElemento = {
    id: new Date().getTime(),
    "total": 0,
    "usuarioRegistrado": null,
    "empelado": null,
    "fecha": null,
    "detalleFactura": [],
    "estado": "preparando"
};

const initialValuesDetalleElemento = {
    descripcion: "",
    precio: 1,
    cantidad: 1,
    subtotal: 1
};

export default function FormFacturaModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [listaDetalleFactura, setListaDetalleFactura] = useState([]);
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento)
    console.log("asdasda")
    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        setElemento((elemento) => {
            let total = listaDetalleFactura.reduce((p, c) => p + c.subtotal, 0);
            return { ...elemento, total: total, detalleFactura: listaDetalleFactura }
        })
    }, [listaDetalleFactura])

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
        (modificar === true) ? FacturasService.modifyFactura(elemento) : FacturasService.addFactura(elemento);
        onHide();
    }

    const agregarDetalleFactura = (e) => {
        if (!detalleElemento.descripcion) {
            alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
            return;
        }

        setListaDetalleFactura((listaDetalleFactura) => {
            return [...listaDetalleFactura, {
                ...detalleElemento,
                id: Date.now(),
                subtotal: (detalleElemento.precio * detalleElemento.cantidad)
            }];
        })
        setDetalleElemento(initialValuesDetalleElemento);
    }
    const handleChangeDetalleFactura = (e) => {
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [e.target.name]: e.target.value };
        });
    }
    const handleDeleteClick = (e) => {
        setListaDetalleFactura((listaDetalleFactura) => {
            return listaDetalleFactura.filter((c) => c.id !== e.id);
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {!modificar ? "Alta Venta" : "Modificar Venta"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <label className="title-factura">Datos de la Factura</label><br />
                    {/* <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.nombre} name="nombre" required placeholder="Nombre" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.apellido} name="apellido" required placeholder="Apellido" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text> <BsBuilding /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.localidad} name="localidad" required placeholder="Localidad" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsMap /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.domicilio} name="domicilio" required placeholder="Domicilio" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFilePost /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.codigoPostal} name="codigoPostal" required placeholder="Codigo Postal" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsPhone /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.telefono} name="telefono" required placeholder="Numero de telefono" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><MdMail /></InputGroup.Text>
                        <FormControl onChange={handleChange} name="correo" value={elemento.correo} required placeholder="Correo Electrónico" />
                    </InputGroup> */}
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.telefono} name="telefono" required placeholder="DNI de empleado" />
                        <Button disabled type="submit" size="lg">Buscar</Button>
                    </InputGroup>
                    <p>No se han encontrado resultados</p>
                    <p>Se ha seleccionado a NOMBRE APELLIDO | DNI: 99999999</p>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.telefono} name="telefono" required placeholder="DNI del cliente" />
                        <Button disabled type="submit" size="lg">Buscar</Button>
                    </InputGroup>
                    <p>No se han encontrado resultados</p>
                    <p>Se ha seleccionado a NOMBRE APELLIDO | DNI: 99999999</p>
                    <InputGroup>
                        <label className="title-factura">Detalle</label>
                    </InputGroup>
                    <Row>
                        <Col sm={6}>
                            <FormControl onChange={handleChangeDetalleFactura} value={detalleElemento.descripcion} name="descripcion" placeholder="Descripcion" />
                        </Col>
                        <Col>
                            <FormControl onChange={handleChangeDetalleFactura} value={detalleElemento.precio} name="precio" type="number" min="1" placeholder="Precio" />
                        </Col>
                        <Col>
                            <FormControl onChange={handleChangeDetalleFactura} value={detalleElemento.cantidad} name="cantidad" placeholder="Cantidad" type="number" min="1" />
                        </Col>
                        <Col>
                            <Button type="button" onClick={agregarDetalleFactura} size="lg">Agregar</Button>
                        </Col>
                    </Row>
                    <Row className="input-formulario">
                        <Col>
                            <Listado atributos={["descripcion", "cantidad", "precio", "subtotal"]} attrKey="id" onDeleteClick={handleDeleteClick} datos={listaDetalleFactura} btnEliminar="true"></Listado>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Total: ${elemento.total}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {listaDetalleFactura.length ? <Button type="submit" size="lg">Guardar</Button> : <Button disabled type="submit" size="lg">Guardar</Button>}
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}