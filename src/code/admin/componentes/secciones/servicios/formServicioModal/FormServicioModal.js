import React, { useEffect, useState } from 'react';
import './FormServicioModal.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Listado from '../../../listado/Listado';
import UtilsService from '../../../../../servicios/UtilsService';
import ServicioService from '../../../../../servicios/ServicioService';

const initialValuesElemento = {
    nombre: "",
    categoria: "banio",
    descripcion: "",
    imagen: "",
    estado: "",
    resenias: []
};

const initialValuesDetalleElemento = {
    "usuario": "",
    "_id": "",
    "comentario": "",
    "estado": "",
    "fecha": Date.now()
};

export default function FormServicioModal({ elementoParaModificar, onHide, show }) {
    const modificar = elementoParaModificar !== undefined;
    const [elemento, setElemento] = useState(elementoParaModificar || initialValuesElemento);
    const [detalleElemento, setDetalleElemento] = useState(initialValuesDetalleElemento);
    const [listaDetalleElemento, setListaDetalleElemento] = useState(elementoParaModificar ? elementoParaModificar.resenias : []);

    useEffect(() => {
        setElemento((elemento) => {
            return { ...elemento, resenias: listaDetalleElemento }
        })
    }, [listaDetalleElemento, detalleElemento])

    const handleChange = (e) => {
        setElemento((elemento) => {
            return { ...elemento, [e.target.name]: e.target.value }
        });
    }

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    //const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        //window.console.log("SERVICIO MODIFICADO ",elemento)
        (modificar === true) ? ServicioService.modifyServicio(elemento) : ServicioService.addServicio(elemento);
        onHide();
    }

    const handleChangeDetalleElemento = (e) => {
        setDetalleElemento((detalleElemento) => {
            return { ...detalleElemento, [e.target.name]: e.target.value };
        });
    }
    const handleDeleteClick = (e) => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.filter((c) => c._id !== e._id);
        });
        setElemento((elemento) => {
            elemento.resenias = listaDetalleElemento;
            return elemento;
        });
    }

    const editarDetalleElemento = () => {
        setListaDetalleElemento((listaDetalleElemento) => {
            return listaDetalleElemento.map((r) => {
                return (r._id === detalleElemento._id) ? detalleElemento : r;
            });
        })
        setElemento((elemento) => {
            elemento.resenias = listaDetalleElemento;
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
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                maxLength="20"
                                type="text"
                                value={elemento.nombre}
                                onChange={handleChange}
                                placeholder="Ingrese nombre del servicio"
                                required />
                            {validarInputText(elemento.nombre)}

                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="categoria">Categoria</Form.Label>
                            <Form.Select name="categoria" onChange={handleChange} value={elemento.categoria} >
                                <option value="banio">Baño (60 minutos)</option>
                                <option value="guarderia">Guarderia (60 minutos)</option>
                                <option value="corte_de_pelo">Corte de Pelo (90 minutos)</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="descripcion">Descripcion</Form.Label>
                            <Form.Control
                                name="descripcion"
                                maxLength="150"
                                value={elemento.descripcion}
                                onChange={handleChange}
                                as="textarea"
                                placeholder="Ingrese descripcion del servicio" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="imagen">URL de Imagen</Form.Label>
                            <Form.Control
                                name="imagen"
                                maxLength="150"
                                value={elemento.imagen}
                                onChange={handleChange}
                                placeholder="Ingrese url de imagen" />
                        </Form.Group>
                        <Form.Group as={Col} sm={4}>
                            <Form.Label htmlFor="estado">Estado</Form.Label>
                            <Form.Select name="estado" onChange={handleChange} value={elemento.estado}>
                                <option value="HABILITADO">HABILITADO</option>
                                <option value="DESHABILITADO">DESHABILITADO</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {elemento.imagen && <><br /> <img src={elemento.imagen} alt={elemento.nombre} height="150" /><br /></>}
                    {elementoParaModificar && <>
                        <br />
                        <Row>
                            <Col className="campos-modificar-resenia">
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Reseña Seleccionada (ID): {detalleElemento._id}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col className="campos-modificar-resenia" sm={4}>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select name="estado" onChange={handleChangeDetalleElemento} value={detalleElemento.estado}>
                                        <option value="ACEPTADA">ACEPTADA</option>
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="RECHAZADA">RECHAZADA</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className="campos-modificar-resenia">
                                <Button type="button" onClick={editarDetalleElemento} size="lg">Cambiar Estado</Button>
                            </Col>
                        </Row>
                        <Row className="input-formulario">
                            <Col>
                                <Listado
                                    attrFuncs={[
                                        { columnaIndex: 1, attrFunc: (p) => (p.nombre + " " + p.apellido) },
                                        { columnaIndex: 3, attrFunc: (p, obj) => (UtilsService.timeStampToStringDate(obj.fecha)) }
                                    ]}
                                    onEditClick={(e) => {
                                        setDetalleElemento(e);
                                    }}
                                    atributos={["_id", "usuario", "comentario", "fecha", "estado"]}
                                    attrKey="_id"
                                    onDeleteClick={handleDeleteClick} datos={listaDetalleElemento} btnEliminar="true"></Listado>
                            </Col>
                        </Row></>}
                    <Row>
                        <Col>
                            <br />
                            <Button type="submit" size="lg">Guardar</Button>
                            {/* {listaDetalleElemento.length ? <Button type="submit" size="lg">Guardar</Button> : <Button disabled type="submit" size="lg">Guardar</Button>} */}
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}