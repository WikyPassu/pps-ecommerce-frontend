import React, { useEffect, useState } from 'react';
import './FormTurnoModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Image } from 'react-bootstrap';
import FacturasService from '../../../../../servicios/VentasService';
import { BsFillPersonFill } from 'react-icons/bs';
import ProductoService from '../../../../../servicios/ProductoService';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';
import UtilsService from '../../../../../servicios/UtilsService';
import ServicioService from '../../../../../servicios/ServicioService';
import Consumibles from '../../consumibles/Consumibles';
import ConsumibleService from '../../../../../servicios/ConsumibleService';
import TurnoService from '../../../../../servicios/TurnoService';

const initialValuesElemento = {
    "id": Date.now(),
    "servicio": null,
    "dniCliente": 0,
    "dniEmpleado": 0,
    "perrito": null,
    "consumibles": [],
    "fecha": Date.now(),
    "precio": 0,
    "estado": "PENDIENTE"
};

const initialValuesDetalleElemento = {
    "id": Date.now(),
    "cantidad": 0,
    "consumible": {
        "id":"",
        "nombre":""
    }
};

export default function FormTurnoModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento);
    const [listaDetalleElemento, setListaDetalleElemento] = useState(elementoParaModificar ? elementoParaModificar.consumibles : []);
    const { empleado, cliente } = elemento;
    useEffect(() => {
        setElemento((elemento) => {
            return { ...elemento, consumibles: listaDetalleElemento }
        })
    }, [listaDetalleElemento, detalleElemento])

    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
        });
    }

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? TurnoService.modifyTurno(elemento) : TurnoService.addTurno(elemento);
        onHide();
    }

    const handleUsuarioChange = (e) => {
        const {name,value} = e.target;
        if(name == "dniEmpleado"){
            const empleado = EmpleadoService.getEmpleadoByDNI(value);
            if(empleado){
                setElemento((elemento)=>{
                    return {...elemento,empleado:empleado}
                })
            }
            else{
                setElemento((elemento)=>{
                    return {...elemento,empleado:null}
                })
            }
        }
        else{
            const cliente = ClienteService.getClienteByDNI(value);
            if(cliente){
                setElemento((elemento)=>{
                    return {...elemento,usuarioRegistrado:cliente}
                })
            }
            else{
                setElemento((elemento)=>{
                    return {...elemento,usuarioRegistrado:null}
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
        let {value,name} = e.target;
        if(name == "consumible"){ value = ConsumibleService.getConsumiblePorId(value); }
        console.log("Lista consumibles",ConsumibleService.getConsumibles());
        console.log(name,value);
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [name]: value };
        });

    }
    const handleDeleteClick = (e) => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.filter((c) => c.id !== e.id);
        });
        setElemento((elemento) => {
            elemento.listaDetalleElemento = listaDetalleElemento;
            return elemento;
        });
    }

    const editarDetalleElemento = () => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.map((r) => {
                return (r.id == detalleElemento.id) ? detalleElemento : r;
            });
        })
        setElemento((elemento) => {
            elemento.consumibles = listaDetalleElemento;
            return elemento;
        });
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {!modificar ? "Alta Servicio" : "Modificar Servicio"}
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
                        <Col sm={6}>
                            <Form.Select onChange={handleChangeDetalleElemento} name="consumible" value={detalleElemento.consumible.id}>
                            <option>Seleccione un Consumible</option>
                            {ConsumibleService.getConsumibles().map((p)=><option value={p.id}>{p.nombre}</option>)}
                        </Form.Select>
                        </Col>
                        {/* <Col>
                            <FormControl value={detalleElemento.servicio} readOnly name="precio" type="text"  placeholder="Precio" />
                        </Col> */}
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
                                {columnaIndex:0,attrFunc:(p)=>{return p.nombre}},
                                {columnaIndex:2,attrFunc:(p,obj)=>{return obj.cantidad * obj.consumible.precioUnidad}},
                            ]}
                            atributos={["consumible","cantidad", "precio"]} 
                            attrKey="id"
                            onDeleteClick={handleDeleteClick} datos={listaDetalleElemento} btnEliminar="true"></Listado>
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