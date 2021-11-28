import React, { useEffect, useState } from 'react';
import './FormFacturaModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col, Alert } from 'react-bootstrap';
import ClienteService from '../../../../../servicios/ClienteService';
import UtilsService from '../../../../../servicios/UtilsService';
import { BsFillPersonFill } from 'react-icons/bs';
import TurnoService from '../../../../../servicios/TurnoService';

const initialValuesElemento = {
    turno:null
};

const initialValuesDetalleElemento = {
    _id: Date.now(),
    producto: { precio: 0 },
    cantidad: 1,
    subtotal: 1
};

export default function FormFacturaModal({ elementoParaModificar, onHide, show }) {
    // const modificar = elementoParaModificar !== undefined;
    const [listaDetalleFactura] = useState(elementoParaModificar ? elementoParaModificar.detalleFactura : []);
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const {usuarioRegistrado} = elemento;
    const [detalleElemento] = useState(initialValuesDetalleElemento);
    const [listaTurnos, setListaTurnos] = useState([])
    const handlerChange = async (e) => {
        let {name,value} = e.target;
        if(name === "turno"){
            value = await TurnoService.getTurnoPorId(value);
        }
        setElemento((elemento) => {
            return { ...elemento, [name]: value }
        })
    }

    useEffect(() => {
        setElemento((elemento) => {
            let total = listaDetalleFactura.reduce((p, c) => p + c.subtotal, 0);
            return { ...elemento, total: total, detalleFactura: listaDetalleFactura }
        })
    }, [listaDetalleFactura, detalleElemento])

    //const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    //const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (elemento.turno && usuarioRegistrado) {
            realizarPago(elemento.turno.servicio.nombre, elemento.turno.precio, usuarioRegistrado);
        }
        else {
            alert("Uno de los campos son invalidos")
        }
        //onHide();
    }

    const handleUsuarioChange = (e) => {
        const { value } = e.target;
        const cliente = ClienteService.getClienteByDNI(value);
        if (cliente) {
            setElemento((elemento) => {
                return { ...elemento, usuarioRegistrado: cliente }
            })
            setListaTurnos(()=>{
                console.log("TODOS LOS TURNOS: ",TurnoService.getTurnos());
                console.log("TURNOS DEL DNI "+cliente.dni,TurnoService.getTurnosPorDni(cliente.dni)) 
                return TurnoService.getTurnosPorDni(cliente.dni).filter((c)=>new Date(c.fecha).getTime()>Date.now());
            })
        }
        else {
            setElemento((elemento) => {
                return { ...elemento, usuarioRegistrado: null }
            })
            setListaTurnos([])
        }
    }

    const realizarPago = (titulo, precio, usuario) => {
        let item = [{
            item: {
                nombre: titulo,
                precio: parseInt(precio)
            },
            cantidad: 1
        }];

        UtilsService.setLoading(true);
        fetch(UtilsService.getUrlsApi().metodoPago.realizarPago, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productos: item,
                cliente: usuario,
                back_urls: {
                    failure: "http://localhost:3000/admin/resultadoTransaccion/fallido",
                    pending: "http://localhost:3000/admin/resultadoTransaccion/pendiente",
                    success: "http://localhost:3000/admin/resultadoTransaccion/exitoso"
                }
            })
        })
            .then(async (res) => {
                if (res.ok) {
                    let jsonData = await res.json();
                    console.log(jsonData);
                    window.location.href = jsonData.mercadoPago.response.init_point;
                }
                else {
                    console.log(res);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                UtilsService.setLoading(false);
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
                    Registrar pago
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <InputGroup className="input-formulario">
                                <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                                <FormControl 
                                type="number" 
                                min="1000000" 
                                max="99999999" 
                                value={usuarioRegistrado?.dni} 
                                onChange={handleUsuarioChange} 
                                name="dniCliente" 
                                placeholder="Ingrese DNI del cliente"
                                required />
                            </InputGroup>
                            <Alert key="alertCliente" variant={usuarioRegistrado ? "success" : "warning"}>
                                {usuarioRegistrado ? `Se seleccionó a ${usuarioRegistrado?.nombre} ${usuarioRegistrado?.apellido}` : "No se encontró el cliente"}
                            </Alert>
                        </Col>
                    </Row>
                    {/* <InputGroup className="input-formulario">
                        <FormControl type="number" onChange={handleUsuarioChange} value={usuarioRegistrado?.dni} placeholder={usuarioRegistrado ? usuarioRegistrado.dni : "DNI del cliente"} name="dniCliente" required />
                    </InputGroup>
                    {usuarioRegistrado ? <b>Se ha seleccionado a {usuarioRegistrado.nombre} {usuarioRegistrado.apellido}</b> : <p>No se han encontrado resultados</p>} */}
                    {usuarioRegistrado?<InputGroup className="input-formulario">
                        <InputGroup.Text>Turnos del Cliente</InputGroup.Text>
                        <Form.Select onChange={handlerChange} name="turno" value={elemento.turno?._id} required>
                            <option>Seleccionar un servicio</option>
                            {console.log("LISTA TURNOS: ",listaTurnos)}
                            {listaTurnos.map((c)=>{return <option value={c._id} key={c._id}>{c.servicio.nombre} | ${c.precio} | {(new Date(c.fecha).toLocaleString())}</option>})}
                        </Form.Select>
                        {/* <FormControl type="text" onChange={handlerChange} value={elemento.titulo} placeholder="Descripcion del pago" name="titulo" required /> */}

                    </InputGroup>:""}
                    {/* <InputGroup className="input-formulario">
                        <FormControl type="number" onChange={handlerChange} value={elemento.precio} placeholder="Precio" name="precio" required />
                    </InputGroup> */}
                    <br />
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