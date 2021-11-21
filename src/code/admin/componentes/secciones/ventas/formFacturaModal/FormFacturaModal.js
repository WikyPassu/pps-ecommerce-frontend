import React, { useEffect, useState } from 'react';
import './FormFacturaModal.css';
import { Modal, InputGroup, Form, Button, FormControl, Row, Col } from 'react-bootstrap';
import ClienteService from '../../../../../servicios/ClienteService';
import EmpleadoService from '../../../../../servicios/EmpleadoService';
import UtilsService from '../../../../../servicios/UtilsService';

const initialValuesElemento = {
    "precio": null,
    "titulo": ""
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
    const { usuarioRegistrado } = elemento;
    const [detalleElemento] = useState(initialValuesDetalleElemento);

    const handlerChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
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
        if(elemento.titulo && elemento.precio && usuarioRegistrado){
            realizarPago(elemento.titulo,elemento.precio,usuarioRegistrado);
        }
        else{
            alert("Uno de los campos son invalidos")
        }
        //onHide();
    }

    const handleUsuarioChange = (e) => {
        const { name, value } = e.target;
        if (name === "dniEmpleado") {
            const empleado = EmpleadoService.getEmpleadoByDNI(value);
            if (empleado) {
                setElemento((elemento) => {
                    return { ...elemento, empleado: empleado }
                })
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, empleado: null }
                })
            }
        }
        else {
            const cliente = ClienteService.getClienteByDNI(value);
            if (cliente) {
                setElemento((elemento) => {
                    return { ...elemento, usuarioRegistrado: cliente }
                })
            }
            else {
                setElemento((elemento) => {
                    return { ...elemento, usuarioRegistrado: null }
                })
            }
        }
    }

    const realizarPago = (titulo, precio, usuario) => {
        let item = [{
            item:{
                nombre:titulo,
                precio:parseInt(precio)
            },
            cantidad:1
        }];
  
        UtilsService.setLoading(true);
        fetch(UtilsService.getUrlsApi().metodoPago.realizarPago,{
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                productos:item,
                cliente:usuario
            })
        })
        .then(async (res)=>{
            if(res.ok){
                let jsonData = await res.json();
                console.log(jsonData);
                window.location.href = jsonData.mercadoPago.response.init_point;
            }
            else{
                console.log(res);
            }
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
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
                    <InputGroup className="input-formulario">
                        {/* <InputGroup.Text><BsFillPersonFill /></InputGroup.Text> */}
                        <FormControl type="number" onChange={handleUsuarioChange} value={usuarioRegistrado?.dni} placeholder={usuarioRegistrado ? usuarioRegistrado.dni : "DNI del cliente"} name="dniCliente" required />
                    </InputGroup>
                    {usuarioRegistrado ? <b>Se ha seleccionado a {usuarioRegistrado.nombre} {usuarioRegistrado.apellido}</b> : <p>No se han encontrado resultados</p>}
                    <InputGroup className="input-formulario">
                        {/* <InputGroup.Text><BsFillPersonFill /></InputGroup.Text> */}
                        <FormControl type="text" onChange={handlerChange} value={elemento.titulo} placeholder="Descripcion del pago" name="titulo" required />
                    </InputGroup>
                    <InputGroup className="input-formulario">
                        {/* <InputGroup.Text><BsFillPersonFill /></InputGroup.Text> */}
                        <FormControl type="number" onChange={handlerChange} value={elemento.precio} placeholder="Precio" name="precio" required />
                    </InputGroup>
                    <br/>
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