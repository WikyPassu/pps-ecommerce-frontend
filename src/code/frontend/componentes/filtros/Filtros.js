import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import './Filtros.css';

const initialState = {
    tipo: "PRODUCTO",
    minimo: 0,
    maximo: 0,
    categoria: ""
}

export default function Filtros({ onChange = ()=>{}, defaultType = "PRODUCTO" }) {
    const [filtros, setFiltros] = useState({...initialState,tipo:defaultType});
    const handlerChange = ({ target }) => {
        let { name, value } = target;
        setFiltros((filtros) => {
            return { ...filtros, [name]: value }
        })
    }

    useEffect(()=>{
        onChange(filtros);
    })
    return <div className="filtros-container">
        <div>
            <h1>Filtros</h1>
        </div>
        <hr />
        <Form>
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
                <Form.Select onChange={handlerChange}>
                    <option>Seleccionar categoria</option>
                    <option value="comida">Comida</option>
                    <option value="cama">Cama</option>
                    <option value="higiene">Higiene</option>
                </Form.Select> :
                <Form.Select onChange={handlerChange}>
                    <option>Seleccionar categoria</option>
                    <option value="banio">Baño</option>
                    <option value="guarderia">Guardería</option>
                    <option value="corte_de_pelo">Corte de Pelo</option>
                </Form.Select>
            }
            <hr />
            <Form.Label>Rango precio</Form.Label>
            <Form.Group controlId="rangoPrecio">
                <Row>
                    <Col>
                        <Form.Control onChange={handlerChange} checked type="number" placeholder="minimo" />
                    </Col>
                    <Col>
                        <Form.Control onChange={handlerChange} checked type="number" placeholder="maximo" />
                    </Col>
                </Row>
            </Form.Group>
            <hr />
            <Button type="reset">Borrar Filtros</Button>
        </Form>
    </div>
}