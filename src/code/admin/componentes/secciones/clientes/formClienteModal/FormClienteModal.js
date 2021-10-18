import React, { useEffect, useState } from 'react';
import './FormClienteModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Image } from 'react-bootstrap';
import FacturasService from '../../../../../servicios/VentasService';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping, MdMail } from 'react-icons/md';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import { HiKey } from 'react-icons/hi';

const initialValuesElemento = {
    id: new Date().getTime(),//El id lo debe crear mongito
    "nombre": "",
    "apellido": "",
    "dni": 0,
    "correo": "",
    "clave": "",
    "domicilio": "",
    "localidad": "",
    "telefono": 0,
    "codigoPostal": 0,
    "perrito": [],
    "estado": "ACTIVO"
};

const initialValuesDetalleElemento = {
    nombre: "",
    peso: 0,
    edad: 0,
    raza: ""
};

export default function FormClienteModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [listaDetalleElemento, setListaDetalleElemento] = useState(elementoParaModificar ? elementoParaModificar.perrito : []);
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento)
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        setElemento((elemento) => {
            return { ...elemento, perrito: listaDetalleElemento }
        })
    }, [listaDetalleElemento])

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;

    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? ClienteService.modifyCliente(elemento) : ClienteService.addCliente(elemento);
        onHide();
    }

    const agregarDetalleElemento = (e) => {
        if (!detalleElemento.nombre || !detalleElemento.peso || !detalleElemento.raza || !detalleElemento.edad) {
            alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
            return;
        }

        setListaDetalleElemento((listaDetalleElemento) => {
            return [...listaDetalleElemento, {
                ...detalleElemento,
                id: Date.now()
            }];
        })
        setDetalleElemento(initialValuesDetalleElemento);
    }
    const handleChangeDetalleElemento = (e) => {
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [e.target.name]: e.target.value };
        });
    }
    const handleDeleteClick = (e) => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.filter((c) => c.id !== e.id);
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            className="form-agregar-modificar"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {!modificar ? "Alta Venta" : "Modificar Venta"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <label className="title-factura">Datos del Cliente</label><br />
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.nombre} name="nombre" required placeholder="Nombre" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.apellido} name="apellido" required placeholder="Apellido" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} type="number" value={elemento.dni} name="dni" required placeholder="DNI" />
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
                        <FormControl onChange={handleChange} type="number" value={elemento.telefono} name="telefono" required placeholder="Numero de telefono" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><MdMail /></InputGroup.Text>
                        <FormControl onChange={handleChange} type="email" name="correo" value={elemento.correo} required placeholder="Correo Electrónico" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><HiKey /></InputGroup.Text>
                        <FormControl onChange={handleChange} type="password" name="clave" value={elemento.clave} required placeholder="Clave" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Estado</InputGroup.Text>
                        <Form.Select name="estado" onChange={handleChange} value={elemento.estado}>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="SUSPENDIDO">SUSPENDIDO</option>
                            <option value="BAJA">BAJA</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup>
                        <label className="title">Sus perros</label>
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Nombre</InputGroup.Text>
                        <FormControl onChange={handleChangeDetalleElemento} value={detalleElemento.nombre} name="nombre" placeholder="nombre" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Peso</InputGroup.Text>
                        <FormControl onChange={handleChangeDetalleElemento} type="number" min="0" value={detalleElemento.peso} name="peso" placeholder="Peso (gr)" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Edad</InputGroup.Text>
                        <FormControl onChange={handleChangeDetalleElemento} type="number" min="0" value={detalleElemento.edad} name="edad" placeholder="edad (años)" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Raza</InputGroup.Text>
                        <Form.Select onChange={handleChangeDetalleElemento} name="raza" value={detalleElemento.raza}>
                            <option>Seleccionar Raza</option>
                            <option value="labrado">Labrador</option>
                            <option value="siberiano">Siberiano</option>
                            <option value="caniche">Caniche</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <Button type="button" onClick={agregarDetalleElemento} size="lg">Agregar</Button>
                    </InputGroup>
                    <Row className="input-formulario">
                        <Col>
                            <Listado atributos={["peso", "nombre", "edad", "raza"]} attrKey="id" onDeleteClick={handleDeleteClick} datos={listaDetalleElemento} btnEliminar="true"></Listado>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" size="lg">Guardar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}