import React, { useEffect, useState } from 'react';
import './FormClienteModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdMail } from 'react-icons/md';
// import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EnviosService from '../../../../../servicios/EnviosService';

const initialValuesElemento = {
    "nombre": "",
    "apellido": "",
    "dni": null,
    "correo": "",
    "clave": "",
    "domicilio": "",
    "localidad": "",
    "telefono": null,
    "codigoPostal": null,
    "perrito": [],
    "estado": "ACTIVO"
};

export default function FormClienteModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [
        listaDetalleElemento,
        //setListaDetalleElemento
    ] = useState(elementoParaModificar ? elementoParaModificar.perrito : []);
    //const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento)
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: (e.target.name === "telefono" || e.target.name === "dni") ? parseInt(e.target.value) : e.target.value }
        })
    }

    useEffect(() => {
        setElemento((elemento) => {
            return { ...elemento, perrito: listaDetalleElemento }
        })
    }, [listaDetalleElemento])

    // const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    // const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;

    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? ClienteService.modifyCliente(elemento) : ClienteService.addCliente(elemento);
        onHide();
    }

    // const agregarDetalleElemento = (e) => {
    //     if (!detalleElemento.nombre || !detalleElemento.peso || !detalleElemento.raza || !detalleElemento.edad) {
    //         alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
    //         return;
    //     }

    //     setListaDetalleElemento((listaDetalleElemento) => {
    //         return [...listaDetalleElemento, {
    //             ...detalleElemento,
    //             _id: Date.now()
    //         }];
    //     })
    //     setDetalleElemento(initialValuesDetalleElemento);
    // }
    // const handleChangeDetalleElemento = (e) => {
    //     setDetalleElemento((detalleElemento) => {
    //         return { ...detalleElemento, [e.target.name]: e.target.value };
    //     });
    // }
    // const handleDeleteClick = (e) => {
    //     setListaDetalleElemento((listaDetalleElemento) => {
    //         return listaDetalleElemento.filter((c) => c._id !== e._id);
    //     })
    // }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            className="form-agregar-modificar"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {!modificar ? "Alta Cliente" : "Modificar Cliente"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <label className="title-factura">Datos del Cliente</label><br />
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Nombre<BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.nombre} name="nombre" required placeholder="Nombre" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Apellido<BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.apellido} name="apellido" required placeholder="Apellido" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>DNI<BsFillPersonFill /></InputGroup.Text>
                        <FormControl onChange={handleChange} min="1000000" max="99999999" type="number" value={elemento.dni} name="dni" required placeholder="DNI" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Localidad<BsBuilding /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.localidad} name="localidad" required placeholder="Localidad" />
                        <Form.Select name="localidad" value={elemento.localidad} onChange={handleChange}>
                            <option value="">Otra localidad</option>
                            {EnviosService.getPrecioEnvios()
                            .filter((c)=>{
                                return c.localidad !== "*";
                            })
                            .map((c) => {
                                return <option
                                value={c.localidad}
                                key={c._id}>{c.localidad}</option>
                            })}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Domicilio<BsMap /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.domicilio} name="domicilio" required placeholder="Domicilio" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>CP<BsFilePost /></InputGroup.Text>
                        <FormControl onChange={handleChange} value={elemento.codigoPostal} name="codigoPostal" required placeholder="Codigo Postal" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Telefono<BsPhone /></InputGroup.Text>
                        <FormControl onChange={handleChange} type="number" value={elemento.telefono} name="telefono" required placeholder="Numero de telefono" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Correo<MdMail /></InputGroup.Text>
                        <FormControl onChange={handleChange} type="email" name="correo" value={elemento.correo} required placeholder="Correo Electrónico" />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text>Estado</InputGroup.Text>
                        <Form.Select name="estado" onChange={handleChange} value={elemento.estado}>
                            <option value="ACTIVO">ACTIVO</option>
                            {/* <option value="PENDIENTE">PENDIENTE</option> */}
                            <option value="SUSPENDIDO">SUSPENDIDO</option>
                            <option value="BAJA">BAJA</option>
                        </Form.Select>
                    </InputGroup>
                    <br />
                    <Row>
                        <Col style={{textAlign:"center"}}>
                            <Button type="submit" size="lg">Guardar</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}