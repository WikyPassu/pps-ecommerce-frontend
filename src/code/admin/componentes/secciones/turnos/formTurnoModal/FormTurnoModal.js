import React, { useEffect, useState } from 'react';
import './FormTurnoModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';
import ServicioService from '../../../../../servicios/ServicioService';
import ConsumibleService from '../../../../../servicios/ConsumibleService';
import TurnoService from '../../../../../servicios/TurnoService';

const initialValuesElemento = {
    "_id": Date.now(),
    "servicio": {_id:""},
    "dniCliente": 0,
    "dniEmpleado": 0,
    "perrito": {
        _id:""
    },
    "consumibles": [],
    "fecha": Date.now(),
    "precio": 0,
    "estado": "PENDIENTE"
};

const initialValuesDetalleElemento = {
    "_id": Date.now(),
    "cantidad": 0,
    "consumible": {
        "_id": "",
        "nombre": ""
    }
};

export default function FormTurnoModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento);
    const [listaDetalleElemento, setListaDetalleElemento] = useState(elementoParaModificar ? elementoParaModificar.consumibles : []);
    const [empleado, setEmpleado] = useState(EmpleadoService.getEmpleadoByDNI(elemento.dniEmpleado));
    const [cliente, setCliente] = useState(ClienteService.getClienteByDNI(elemento.dniCliente));

    useEffect(() => {
        setElemento((elemento) => {
            return { ...elemento, consumibles: listaDetalleElemento }
        })
    }, [listaDetalleElemento, detalleElemento])

    const handleChange = (e) => {
        let {name,value} = e.target;
        if (name === "servicio") { value = ServicioService.getServicioPorId(value); }
        //console.log(name,value);
        setElemento((elemento) => {
            return { ...elemento, [name]: value }
        });
    }

    //const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    //const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? TurnoService.modifyTurno(elemento) : TurnoService.addTurno(elemento);
        onHide();
    }

    const handleUsuarioChange = (e) => {
        const { name, value } = e.target;
        if (name === "dniEmpleado") {
            let empleadoEncontrado = EmpleadoService.getEmpleadoByDNI(value);
            if (empleadoEncontrado) {
                setEmpleado(EmpleadoService.getEmpleadoByDNI(value));
                setElemento((elemento) => {
                    return { ...elemento, dniEmpleado: empleadoEncontrado.dni }
                })
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, dniEmpleado: 0 }
                })
            }
        }
        else {
            let empleadoEncontrado = ClienteService.getClienteByDNI(value);
            if (empleadoEncontrado) {
                setCliente(empleadoEncontrado);
                setElemento((elemento) => {
                    return { ...elemento, dniCliente: empleadoEncontrado.dni }
                })
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, dniCliente: 0 }
                })
            }
        }
    }

    const agregarDetalleElemento = (e) => {
        if (!detalleElemento.consumible) {
            alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
            return;
        }

        setListaDetalleElemento((listaDetalleElemento) => {
            return [...listaDetalleElemento, detalleElemento];
        })
        setDetalleElemento(initialValuesDetalleElemento);
    }

    const handleChangeDetalleElemento = (e) => {
        let { value, name } = e.target;
        if (name === "consumible") { value = ConsumibleService.getConsumiblePorId(value); }
        console.log("Lista consumibles", ConsumibleService.getConsumibles());
        console.log(name, value);
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [name]: value };
        });

    }
    const handleDeleteClick = (e) => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.filter((c) => c._id !== e._id);
        });
        setElemento((elemento) => {
            elemento.listaDetalleElemento = listaDetalleElemento;
            return elemento;
        });
    }

    // const editarDetalleElemento = () => {
    //     setListaDetalleElemento((listaDetalleElemento) => {
    //         return listaDetalleElemento.map((r) => {
    //             return (r._id === detalleElemento._id) ? detalleElemento : r;
    //         });
    //     })
    //     setElemento((elemento) => {
    //         elemento.consumibles = listaDetalleElemento;
    //         return elemento;
    //     });
    // }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            className="form-turno-modal"
            centered>
            <Modal.Header closeButton>
                <Modal.Title className="titulo">
                    {!modificar ? "Alta Turno" : "Modificar Turno"}
                    <label >Total: ${listaDetalleElemento.reduce((p, c) => p + c.cantidad * c.consumible.precioUnidad, 0)}</ label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} name="dniEmpleado" required placeholder="DNI de empleado" />
                    </InputGroup>
                    {empleado ? <b>Se ha seleccionado a {empleado.nombre} {empleado.apellido}</b> : <p>No se han encontrado resultados</p>}
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} name="dniCliente" required placeholder="DNI del cliente" />
                    </InputGroup>
                    {cliente ? <b>Se ha seleccionado a {cliente.nombre} {cliente.apellido}</b> : <p>No se han encontrado resultados</p>}
                    <Row>
                        <Col sm={12}>
                            <Form.Select onChange={handleChange} name="servicio" value={elemento.servicio._id}>
                                <option>Seleccione un Servicio</option>
                                {ServicioService.getServicios().map((p) => <option value={p._id}>{p.nombre}</option>)}
                            </Form.Select>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Select onChange={handleChangeDetalleElemento} name="consumible" value={detalleElemento.consumible._id}>
                                <option>Seleccione un Consumible</option>
                                {ConsumibleService.getConsumibles().map((p) => <option value={p._id}>{p.nombre}</option>)}
                            </Form.Select>
                        </Col>
                        <Col>
                            <FormControl onChange={handleChangeDetalleElemento} value={detalleElemento.cantidad} name="cantidad" placeholder="Cantidad" type="number" min="1" />
                        </Col>
                        <Col>
                            <Button type="button" onClick={agregarDetalleElemento} size="lg">Agregar</Button>
                        </Col>
                    </Row>
                    
                    <Row className="input-formulario">
                        <Col>
                            <Listado
                                attrFuncs={[
                                    { columnaIndex: 0, attrFunc: (p) => { return p.nombre } },
                                    { columnaIndex: 1, attrFunc: (p, obj) => { return obj.consumible.precioUnidad } },
                                    { columnaIndex: 3, attrFunc: (p, obj) => { return obj.cantidad * obj.consumible.precioUnidad } }
                                ]}
                                atributos={["consumible", "Precio Unidad", "cantidad", "precio"]}
                                attrKey="id"
                                onDeleteClick={handleDeleteClick} datos={listaDetalleElemento} btnEliminar="true" />
                        </Col>
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