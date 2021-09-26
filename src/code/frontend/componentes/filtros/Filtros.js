import { InputGroup, Form, Col, Row, Button } from "react-bootstrap";
import './Filtros.css';
export default function Filtros() {
    return <div className="filtros-container">

        <div>
            <h1>Filtros</h1>
        </div>
        <hr />
        <Form>
            <Form.Label>Tipo</Form.Label>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" id="op-chk-producto" label="Producto" />
                <Form.Check type="checkbox" id="op-chk-servicio" label="Servicios" />
            </Form.Group>
            <hr />
            <Form.Label>Categoria</Form.Label>
            <Form.Select>
                <option>Seleccionar categoria</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            <hr />
            <Form.Label>Rango precio</Form.Label>
            <Form.Group controlId="rangoPrecio">
                <Row>
                    <Col>
                        <Form.Control checked type="number" placeholder="minimo" />
                    </Col>
                    <Col>
                        <Form.Control checked type="number" placeholder="maximo" />
                    </Col>
                </Row>
            </Form.Group>
            <hr />
            <Button type="reset">Borrar Filtros</Button>
        </Form>
    </div>
}