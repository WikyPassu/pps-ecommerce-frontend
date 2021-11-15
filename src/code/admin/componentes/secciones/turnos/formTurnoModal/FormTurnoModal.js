import React, { useEffect, useState } from 'react';
import './FormTurnoModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';
import ServicioService from '../../../../../servicios/ServicioService';
//import ConsumibleService from '../../../../../servicios/ConsumibleService';
import TurnoService from '../../../../../servicios/TurnoService';

const initialValuesElemento = {
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
    const [detalleElemento] = useState(initialValuesDetalleElemento);
    const [listaDetalleElemento, setListaDetalleElemento] = useState(elementoParaModificar ? elementoParaModificar.consumibles : []);
    const [empleado, setEmpleado] = useState(EmpleadoService.getEmpleadoByDNI(elemento.dniEmpleado));
    const [cliente, setCliente] = useState(ClienteService.getClienteByDNI(elemento.dniCliente));

    useEffect(() => {
        setElemento((elemento) => {
            return { 
                ...elemento, 
                consumibles: listaDetalleElemento,

            }
        })
    }, [listaDetalleElemento, detalleElemento])

    const handleChange = (e) => {
        let {name,value} = e.target;
        if (name === "servicio") {
            if(value){
                value = ServicioService.getServicioPorId(value); 
                let {precio, consumibles} = ServicioService.calcularCostoDelServicio(value,elemento.perrito)
                setElemento((elemento) => {
                    return { ...elemento, [name]: value,precio,consumibles }
                });
                setListaDetalleElemento(consumibles)
            }
            else{
                setElemento((elemento) => {
                    return { ...elemento, [name]: {_id:""},precio:0,consumibles:[] }
                });
                setListaDetalleElemento([])
            }
        }
        else{
            setElemento((elemento) => {
                return { ...elemento, [name]: value }
            });
        }
        
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
            let clienteEncontrado = ClienteService.getClienteByDNI(value);
            console.log(clienteEncontrado)
            if (clienteEncontrado) {
                setCliente(clienteEncontrado);
                setElemento((elemento) => {
                    return { ...elemento, dniCliente: clienteEncontrado.dni }
                })
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, dniCliente: 0 }
                })
            }
        }
    }

    // const agregarDetalleElemento = (e) => {
    //     if (!detalleElemento.consumible) {
    //         alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
    //         return;
    //     }


    //     setListaDetalleElemento((listaDetalleElemento) => {
    //         return [...listaDetalleElemento, detalleElemento];
    //     })
    //     setDetalleElemento(initialValuesDetalleElemento);
    // }

    // const handleChangeDetalleElemento = (e) => {
    //     let { value, name } = e.target;
    //     if (name === "consumible") { value = ConsumibleService.getConsumiblePorId(value); }
    //     console.log("Lista consumibles", ConsumibleService.getConsumibles());
    //     console.log(name, value);
    //     setDetalleElemento((detalleElemento) => {
    //         return { ...detalleElemento, [name]: value };
    //     });

    // }
    // const handleDeleteClick = (e) => {
    //     setListaDetalleElemento((listaDetalleElemento) => {
    //         return listaDetalleElemento.filter((c) => c._id !== e._id);
    //     });
    //     setElemento((elemento) => {
    //         elemento.listaDetalleElemento = listaDetalleElemento;
    //         return elemento;
    //     });
    // }

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
                    <label >Total: ${
                        elemento.precio.toFixed(2)
                    // listaDetalleElemento.reduce((p, c) => p + c.cantidad * c.consumible.precioUnidad, 0)
                    }</ label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} placeholder={empleado?empleado.dni:"DNI de empleado"} name="dniEmpleado" required />
                    </InputGroup>
                    {empleado ? <b>Se ha seleccionado a {empleado.nombre} {empleado.apellido}</b> : <p>No se han encontrado resultados</p>}
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} placeholder={cliente?cliente.dni:"DNI de cliente"} name="dniCliente" required />
                    </InputGroup>
                    {cliente ? <b>Se ha seleccionado a {cliente.nombre} {cliente.apellido}</b> : <p>No se han encontrado resultados</p>}
                    <Row>
                        <Col sm={12}>
                            <Form.Select onChange={handleChange} name="servicio" value={elemento.servicio._id}>
                                <option value="">Seleccione un Servicio</option>
                                {ServicioService.getServicios().map((p) => <option value={p._id}>{p.nombre}</option>)}
                            </Form.Select>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Form.Select onChange={handleChange} name="estado" value={elemento.estado}>
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="CANCELADO">Cancelado</option>
                                <option value="FINALIZADO">Finalizado</option>
                            </Form.Select>
                            <br/>
                        </Col>
                    </Row>
                    {/* <Row>
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
                    </Row> */}
                    
                    <Row className="input-formulario">
                        <Col>
                            <Listado
                                attrFuncs={[
                                    { columnaIndex: 0, attrFunc: (p) => { return p.nombre } },
                                    { columnaIndex: 1, attrFunc: (p, obj) => { return obj.consumible.precioUnidad } },
                                    { columnaIndex: 2, attrFunc: (p, obj) => { return p.toFixed(2) } },
                                    { columnaIndex: 3, attrFunc: (p, obj) => { return (obj.cantidad * obj.consumible.precioUnidad).toFixed(2) } }
                                ]}
                                atributos={["consumible", "Precio Unidad", "cantidad", "precio"]}
                                attrKey="id"
                                // onDeleteClick={handleDeleteClick} 
                                datos={listaDetalleElemento} 
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        Costo en Consumibles: ${listaDetalleElemento.reduce((p, c) => p + c.cantidad * c.consumible.precioUnidad, 0).toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        Ganancia:  ${(elemento.precio - listaDetalleElemento.reduce((p, c) => p + c.cantidad * c.consumible.precioUnidad, 0)).toFixed(2)}
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