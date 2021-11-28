import { Form, Row, Col, Button } from 'react-bootstrap';
import "./FormularioCompra.css";
export default function FormularioCompra({ onSubmit, onChange, stock }) {
    return <Form onSubmit={onSubmit} className="formulario-compra">
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Cantidad
                </Form.Label>
                <Col xs={12} sm={5}>
                    <Form.Control min="1" max={stock} defaultValue="1" onChange={onChange} name="cantidad" type="number" />
                </Col>
            </Row>
            <Row>
                <div className="grupo-botones">
                    <Button type="submit" size="lg">Agregar al Carrito</Button>
                </div>
            </Row>
        </Form.Group>
    </Form>
}