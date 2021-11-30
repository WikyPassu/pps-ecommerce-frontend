import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import './Filtros.css';

const initialState = {
    tipo: "PRODUCTO",
    minimo: 0,
    maximo: 0,
    categoria: ""
}

export default function Filtros({ onSumbit = () => { }, onReset = () => { }, defaultType = "PRODUCTO" }) {
    const [filtros, setFiltros] = useState({ ...initialState, tipo: defaultType });

    const [busqueda, setBusqueda] = useState("");


    const handlerChange = ({ target }) => {
        let { name, value } = target;

        name === "busqueda" ? setBusqueda(value) :
            setFiltros((filtros) => {
                return { ...filtros, [name]: value }
            });
        
    }

    const handlerReset = () => {
        setFiltros({ ...initialState, tipo: defaultType });
        onReset();
        setBusqueda("");
    }

    const handlerSumit = (e) => {
        e.preventDefault();
        onSumbit(filtros, busqueda);
    }

    useEffect(() => {

    })
    return <div className="filtros-container">
        <div>
            <h1>Filtros</h1>
        </div>
        <hr />
        <Form onSubmit={handlerSumit} onReset={handlerReset}>
            <Form.Label>Buscar:</Form.Label>
            <Form.Control required value={busqueda} onChange={handlerChange} type="text" name="busqueda" placeholder="Hola, ¿qué busca?" />
            <Form.Label>Tipo</Form.Label>
            <Form.Group controlId="formBasicCheckbox">
                <Row>
                    <Col>
                        <Form.Check type="radio" value="PRODUCTO" onChange={handlerChange} name="tipo" id="op-chk-producto" checked={filtros.tipo === "PRODUCTO"} label="Producto" />
                    </Col>
                    <Col>
                        <Form.Check type="radio" value="SERVICIO" onChange={handlerChange} name="tipo" id="op-chk-servicio" checked={filtros.tipo === "SERVICIO"} label="Servicios" />
                    </Col>
                </Row>
            </Form.Group>
            <hr />
            <Form.Label>Categoria</Form.Label>
            {filtros.tipo === "PRODUCTO" ?
                <Form.Select name="categoria" value={filtros.categoria} onChange={handlerChange}>
                    <option value="">Seleccionar categoria</option>
                    <option value="comida">Comida</option>
                    <option value="cama">Cama</option>
                    <option value="higiene">Higiene</option>
                </Form.Select> :
                <Form.Select name="categoria" value={filtros.categoria} onChange={handlerChange}>
                    <option value="">Seleccionar categoria</option>
                    <option value="banio">Baño</option>
                    <option value="guarderia">Guardería</option>
                    <option value="corte_de_pelo">Corte de Pelo</option>
                </Form.Select>
            }
            {filtros.tipo === "PRODUCTO" ?
                <>
                    <hr />
                    <Form.Label>Rango precio</Form.Label>
                    <Form.Group controlId="rangoPrecio">
                        <Row>
                            <Col>
                                <Form.Control name="minimo" value={filtros.minimo} onChange={handlerChange} checked type="number" placeholder="minimo" />
                            </Col>
                            <Col>
                                <Form.Control name="maximo" value={filtros.maximo} onChange={handlerChange} checked type="number" placeholder="maximo" />
                            </Col>
                        </Row>
                    </Form.Group>
                </> : ""}
            <hr />
            <Button style={{ width: "100%" }} type="reset">Borrar Filtros</Button>
            <Button style={{ width: "100%", marginTop: "10px" }} type="submit">Aplicar</Button>

        </Form>
    </div>
}