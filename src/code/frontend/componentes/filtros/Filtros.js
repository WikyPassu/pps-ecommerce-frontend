import { Form, Col, Row, Button } from "react-bootstrap";
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
                <Row>
                    <Col>
                        <Form.Check type="radio" name="tipo" id="op-chk-producto" checked label="Producto" />
                    </Col>
                    <Col>
                        <Form.Check type="radio" name="tipo" id="op-chk-servicio" label="Servicios" />
                    </Col>
                </Row>
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