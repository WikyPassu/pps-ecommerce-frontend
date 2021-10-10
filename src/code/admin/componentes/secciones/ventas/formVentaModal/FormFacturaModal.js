import React, { useState } from 'react';
import './FormFacturaModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Image } from 'react-bootstrap';
import FacturasService from '../../../../../servicios/VentasService';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';
import ProductoService from '../../../../../servicios/ProductoService';
import Listado from '../../../listado/Listado';

export default function FormFacturaModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [listaDetalleFactura, setListaDetalleFactura] = useState([])
    const [elemento, setElemento] = useState(elementoParaModificar || {
        codigo: new Date().getTime(),
        nombre: "",
        categoria: "",
        descripcion: "",
        imagen: "",
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
        (modificar === true) ? FacturasService.modifyProducto(elemento) : FacturasService.addProducto(elemento);
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
                    {!modificar ? "Alta Venta" : "Modificar Venta"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <label className="title-factura">Datos de la Factura</label><br />
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl placeholder="Nombres" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl placeholder="Apellido" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text> <BsBuilding /></InputGroup.Text>
                        <FormControl placeholder="Localidad" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsMap /></InputGroup.Text>
                        <FormControl placeholder="Direccion" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFilePost /></InputGroup.Text>
                        <FormControl placeholder="Codigo Postal" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsPhone /></InputGroup.Text>
                        <FormControl placeholder="Numero de telefono" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><MdLocalShipping /></InputGroup.Text>
                        <Form.Select>
                            <option>Seleccione forma de envio</option>
                            <option value="retiro_local">Retiro del Local</option>
                            <option value="a_domicilio">A domicilio</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup>
                        <label className="title-factura">Detalle</label>
                    </InputGroup>
                    <Row>
                        <Col sm={6}>
                            <FormControl placeholder="Descripcion" />
                        </Col>
                        <Col>
                            <FormControl type="number" min="1" defaultValue="1" placeholder="Precio" />
                        </Col>
                        <Col>
                            <FormControl placeholder="Cantidad" type="number" min="1" defaultValue="1" />
                        </Col>
                        <Col>
                            <Button size="lg">Agregar</Button>
                        </Col>
                    </Row>
                    <Row className="input-formulario">
                        <Col>
                        <Listado atributos={["descripcion", "cantidad", "precio"]} datos={listaDetalleFactura}></Listado>
                        </Col>
                        
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}