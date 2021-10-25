import React, { useEffect, useState } from 'react';
import './FormFacturaModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Image } from 'react-bootstrap';
import FacturasService from '../../../../../servicios/VentasService';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping, MdMail } from 'react-icons/md';
import ProductoService from '../../../../../servicios/ProductoService';
import Listado from '../../../listado/Listado';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';

const initialValuesElemento = {
    id: new Date().getTime(),
    "total": 0,
    "usuarioRegistrado": null,
    "empleado": null,
    "fecha": null,
    "detalleFactura": [],
    "estado": "preparando"
};

const initialValuesDetalleElemento = {
    id:Date.now(),
    producto: {precio:0},
    cantidad: 1,
    subtotal: 1
};

export default function FormFacturaModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [listaDetalleFactura, setListaDetalleFactura] = useState(elementoParaModificar?elementoParaModificar.detalleFactura:[]);
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const {empleado, usuarioRegistrado} = elemento;
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento);
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
    }, [listaDetalleFactura,detalleElemento])

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;
    

    const handleSubmit = (e) => {
        e.preventDefault();
        (modificar === true) ? FacturasService.modifyFactura(elemento) : FacturasService.addFactura(elemento);
        onHide();
    }

    const agregarDetalleFactura = (e) => {
        if (!detalleElemento.producto) {
            alert(`¡Error! El campo ${e.target.name} no puede estar vacío`);
            return;
        }

        setListaDetalleFactura((listaDetalleFactura) => {
            return [...listaDetalleFactura, {
                ...detalleElemento,
                id: Date.now(),
                subtotal: (detalleElemento.producto.precio * detalleElemento.cantidad)
            }];
        })
        setDetalleElemento(initialValuesDetalleElemento);
    }
    const handleChangeDetalleFactura = ({target}) => {
        let {value, name} = target;
        if(name == "producto"){
            // console.log("producto",JSON.parse(value))
            value = JSON.parse(value);
        }
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [name]: value };
        });
        // console.log(detalleElemento)
    }
    const handleDeleteClick = (e) => {
        setListaDetalleFactura((listaDetalleFactura) => {
            return listaDetalleFactura.filter((c) => c.id !== e.id);
        })
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
                    <Form.Group as={Col} sm={4}>
                            <Form.Label htmlFor="estado">Estado</Form.Label>
                            <Form.Select name="estado" onChange={handleChange} value={elemento.estado}>
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="DESPACHADO">DESPACHADO</option>
                                <option value="ENTREGADO">ENTREGADO</option>
                            </Form.Select>
                        </Form.Group>
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} name="dniEmpleado" required placeholder="DNI de empleado" />
                    </InputGroup>
                    {empleado?<b>Se ha seleccionado a {empleado.nombre} {empleado.apellido}</b>:<p>No se han encontrado resultados</p>}
                    <InputGroup className="input-formulario">
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <FormControl type="number" onChange={handleUsuarioChange} name="dniCliente" required placeholder="DNI del cliente" />
                    </InputGroup>
                    {usuarioRegistrado?<b>Se ha seleccionado a {usuarioRegistrado.nombre} {usuarioRegistrado.apellido}</b>:<p>No se han encontrado resultados</p>}
                    <InputGroup>
                        <label className="title-factura">Detalle</label>
                    </InputGroup>
                    <Row>
                        <Col sm={6}>
                            {/* <FormControl onChange={handleChangeDetalleFactura} value={detalleElemento.descripcion} name="descripcion" placeholder="Descripcion" /> */}
                            <Form.Select onChange={handleChangeDetalleFactura} name="producto" value={detalleElemento.nombre}>
                            <option>Seleccione un producto</option>
                            {ProductoService.getProductos().map((p)=><option value={JSON.stringify(p)}>{p.nombre}</option>)}
                        </Form.Select>
                        </Col>
                        <Col>
                            <FormControl value={detalleElemento.producto.precio} readOnly name="precio" type="text"  placeholder="Precio" />
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
                            <Listado 
                            attrFuncs={[
                                {columnaIndex:0,attrFunc:(p)=>{return p.nombre}},
                                {columnaIndex:2,attrFunc:(p,obj)=>{return obj.producto.precio}}
                            ]}
                            atributos={["producto","cantidad", "precio", "subtotal"]} 
                            attrKey="id"
                            onDeleteClick={handleDeleteClick} datos={listaDetalleFactura} btnEliminar="true"></Listado>
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