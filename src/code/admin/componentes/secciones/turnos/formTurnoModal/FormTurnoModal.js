import React, { useEffect, useState } from 'react';
import './FormTurnoModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Alert } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';
import ServicioService from '../../../../../servicios/ServicioService';
import TurnoService from '../../../../../servicios/TurnoService';


const initialValuesElemento = {
    "servicio": { _id: "" },
    "dniCliente": 0,
    "dniEmpleado": 0,
    "perrito": {
        _id: ""
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
    const [empleado, setEmpleado] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [descontarStockConsumibles, setDescontarStockConsumibles] = useState(false)
    useEffect(() => {
        setEmpleado((empleado) => {
            return EmpleadoService.getEmpleadoByDNI(elemento.dniEmpleado);
        })
        setCliente((cliente) => {
            return ClienteService.getClienteByDNI(elemento.dniCliente);
        })

    }, [listaDetalleElemento, detalleElemento, empleado, elementoParaModificar,elemento])

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "servicio") {
            if (value) {
                value = ServicioService.getServicioPorId(value);
                let { precio, consumibles } = ServicioService.calcularCostoDelServicio(value, elemento.perrito)
                setElemento((elemento) => {
                    return { ...elemento, [name]: value, precio, consumibles }
                });
                setListaDetalleElemento(consumibles)
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, [name]: { _id: "" }, precio: 0, consumibles: [] }
                });
                setListaDetalleElemento([])
            }
        }
        else {
            setElemento((elemento) => {
                return { ...elemento, [name]: value }
            });
        }

        if (name === "dniEmpleado") {
            setEmpleado((empleado) => {
                return EmpleadoService.getEmpleadoByDNI(value);
            })
        }
        else if(name === "dniCliente"){
            setCliente((cliente) => {
                return ClienteService.getClienteByDNI(value);
            })
        }

    }

    //const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    //const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        let continuar = true;
        if(!empleado){
            continuar = window.confirm("No se ha encontrado ningún empleado que coincida con el DNI. ¿Desea continuar de todas formas?")
        }
        else if(!cliente){
            continuar = window.confirm("No se ha encontrado ningún cliente que coincida con el DNI. ¿Desea continuar de todas formas?")
        }

        if(continuar){
            if (window.confirm("¿Esta seguro que sea modificar el turno?")) {
                (modificar === true) ? TurnoService.modifyTurno(elemento, descontarStockConsumibles) : TurnoService.addTurno(elemento);
                onHide();
            }
        }
       
    }

    // const handleUsuarioChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === "dniEmpleado") {
    //         let empleadoEncontrado = EmpleadoService.getEmpleadoByDNI(value);
    //         if (empleadoEncontrado) {
    //             setEmpleado(empleadoEncontrado);
    //             setElemento((elemento) => {
    //                 return { ...elemento, dniEmpleado: empleadoEncontrado.dni }
    //             })
    //         }
    //         else {
    //             setEmpleado(null);
    //             setElemento((elemento) => {
    //                 return { ...elemento, dniEmpleado: 0 }
    //             })
    //         }
    //     }
    //     else {
    //         let clienteEncontrado = ClienteService.getClienteByDNI(value);
    //         console.log(clienteEncontrado)
    //         if (clienteEncontrado) {
    //             setCliente(clienteEncontrado);
    //             setElemento((elemento) => {
    //                 return { ...elemento, dniCliente: clienteEncontrado.dni }
    //             })
    //         }
    //         else {
    //             setCliente(null);
    //             setElemento((elemento) => {
    //                 return { ...elemento, dniCliente: 0 }
    //             })
    //         }
    //     }
    // }

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
                    }</ label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <InputGroup className="input-formulario">
                                <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                                <FormControl type="number" min="1000000" max="99999999" value={elemento.dniEmpleado} onChange={handleChange} name="dniEmpleado" required />
                                <Button onClick={()=>{
                                    setEmpleado(EmpleadoService.getUsuario())
                                    setElemento((elemento)=>{
                                        return {...elemento, dniEmpleado:EmpleadoService.getUsuario().dni}; 
                                    })
                                }}>Usar empleado logeado</Button>
                            </InputGroup>
                            <Alert key="alertEmpleado" variant={empleado ? "success" : "warning"}>
                                {empleado ? `Se seleccionó a ${empleado.nombre} ${empleado.apellido}` : "No se encontró el empleado"}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="input-formulario">
                                <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                                <FormControl type="number" min="1000000" max="99999999" value={elemento.dniCliente} onChange={handleChange} name="dniCliente" required />
                            </InputGroup>
                            <Alert key="alertCliente" variant={cliente ? "success" : "warning"}>
                                {cliente ? `Se seleccionó a ${cliente.nombre} ${cliente.apellido}` : "No se encontró el cliente"}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <InputGroup className="input-formulario">
                                <InputGroup.Text>Servicio</InputGroup.Text>
                                <Form.Select onChange={handleChange} name="servicio" value={elemento.servicio._id} required>
                                    <option>Seleccione un Servicio</option>
                                    {ServicioService.getServicios().map((p) => <option value={p._id}>{p.nombre}</option>)}
                                </Form.Select>
                            </InputGroup>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <InputGroup className="input-formulario">
                                <InputGroup.Text>Estado</InputGroup.Text>
                                <Form.Select onChange={handleChange} name="estado" value={elemento.estado}>
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="CANCELADO">Cancelado</option>
                                    <option value="FINALIZADO">Finalizado</option>
                                </Form.Select>
                            </InputGroup>

                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            Datos del Perro
                        </Col>
                    </Row>

                    <li><b>Nombre:</b> {elemento.perrito.nombre}</li>
                    <li><b>Peso:</b> {elemento.perrito.peso} g</li>
                    <li><b>Edad:</b> {elemento.perrito.edad} Años</li>
                    <li><b>Raza:</b> {elemento.perrito.raza}</li>

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
                            <Form.Check
                                type="checkbox"
                                label={`Descontar stock de consumibles`}
                                value={descontarStockConsumibles}
                                onChange={({ target }) => {
                                    setDescontarStockConsumibles(target.checked)
                                }}
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
                            Ganancia:  ${(elemento.precio - listaDetalleElemento.reduce((p, c) => p + c.cantidad * c.consumible.precioUnidad, 0)).toFixed(2)} ({elemento.servicio.costo.porcentajeGanancia}%)
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