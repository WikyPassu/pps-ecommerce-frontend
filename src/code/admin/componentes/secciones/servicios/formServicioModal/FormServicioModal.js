import React, { useEffect, useState } from 'react';
import './FormServicioModal.css';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Listado from '../../../listado/Listado';
import UtilsService from '../../../../../servicios/UtilsService';
import ServicioService from '../../../../../servicios/ServicioService';
import ConsumibleService from '../../../../../servicios/ConsumibleService';

const initialValuesElemento = {
    nombre: "",
    categoria: "banio",
    descripcion: "",
    imagen: "",
    estado: "HABILITADO",
    "costo": {
        "consumible": null,
        "gramosPerroPorUnidad": null,
        "porcentajeGanancia": null,
        "precioMinimo":0
    },
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
    const [listaConsumibles, setListaConsumibles] = useState([]);
    useEffect(() => {
        setListaConsumibles(ConsumibleService.getConsumibles());
        setElemento((elemento) => {
            return { ...elemento, resenias: listaDetalleElemento }
        })
    }, [listaDetalleElemento, detalleElemento])

    const handlerChange = (e) => {
        let { name, value } = e.target;
        if (name.includes("costo.")) {
            name = name.replace("costo.", "");
            value = (name === "porcentajeGanancia" || name === "gramosPerroPorUnidad" || name === "precioMinimo") ? parseInt(value) : value;
            setElemento((elemento) => {
                return {
                    ...elemento, costo: {
                        ...elemento.costo,
                        [name]: value
                    }
                }
            });
        }
        else {
            setElemento((elemento) => {
                return { ...elemento, [name]: value }
            });
        }
    }

    const validarInputText = (valor) => (!valor.trim()) && <Form.Text>Este campo no puede estar vacío</Form.Text>;

    //const validarInputNumber = (valor) => (valor < 0) && <Form.Text>Este campo no puede tener valores negativos</Form.Text>;


    const handleSubmit = (e) => {
        e.preventDefault();
        //window.console.log("SERVICIO MODIFICADO ",elemento)
        (modificar === true) ? ServicioService.modifyServicio(elemento) : ServicioService.addServicio(elemento);
        onHide();
    }

    const handlerChangeDetalleElemento = (e) => {
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
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="nombre">Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                maxLength="20"
                                type="text"
                                value={elemento.nombre}
                                onChange={handlerChange}
                                placeholder="Ingrese nombre del servicio"
                                required />
                            {validarInputText(elemento.nombre)}

                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="categoria">Categoria</Form.Label>
                            <Form.Select name="categoria" onChange={handlerChange} value={elemento.categoria} >
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
                                onChange={handlerChange}
                                as="textarea"
                                placeholder="Ingrese descripcion del servicio" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="costo.consumible">Consumible</Form.Label>
                                <Form.Select
                                    name="costo.consumible"
                                    onChange={handlerChange}
                                    value={elemento.costo.consumible}>
                                    {listaConsumibles.map((c) => <option value={c.nombre} key={c.nombre}>{c.nombre}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="costo.gramosPerroPorUnidad">Gramos de perro por unidad de consumible</Form.Label>
                                <Form.Control
                                    name="costo.gramosPerroPorUnidad"
                                    min="0"
                                    type="number"
                                    value={elemento.costo.gramosPerroPorUnidad}
                                    onChange={handlerChange}
                                    placeholder="Gramos de Perro por Unidad de Consumible" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="costo.gramosPerroPorUnidad">Porcentaje Ganancia</Form.Label>
                                <Form.Control
                                    name="costo.porcentajeGanancia"
                                    max="1000"
                                    min="0"
                                    type="number"
                                    value={elemento.costo.porcentajeGanancia}
                                    onChange={handlerChange}
                                    placeholder="Porcentaje Ganancia" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="costo.gramosPerroPorUnidad">Precio Mínimo</Form.Label>
                                <Form.Control
                                    name="costo.precioMinimo"
                                    required
                                    min="0"
                                    type="number"
                                    value={elemento.costo.precioMinimo}
                                    onChange={handlerChange}
                                    placeholder="Precio Mínimo" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="imagen">URL de Imagen</Form.Label>
                            <Form.Control
                                name="imagen"
                                maxLength="150"
                                value={elemento.imagen}
                                onChange={handlerChange}
                                placeholder="Ingrese url de imagen" />
                        </Form.Group>
                        <Form.Group as={Col} sm={4}>
                            <Form.Label htmlFor="estado">Estado</Form.Label>
                            <Form.Select name="estado" onChange={handlerChange} value={elemento.estado}>
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
                                    <Form.Select name="estado" onChange={handlerChangeDetalleElemento} value={detalleElemento.estado}>
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
                        <Col  style={{textAlign:"center"}}>
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