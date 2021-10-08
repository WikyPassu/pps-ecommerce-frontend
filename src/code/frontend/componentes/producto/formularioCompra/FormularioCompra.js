import { Form, Row, Col, Button } from 'react-bootstrap';
import CalendarioTurno from '../../servicio/calendarioTurno/CalendarioTurno';
import "./FormularioCompra.css";
export default function FormularioCompra({ onSubmit, onChange }) {
    return <Form noValidate onSubmit={onSubmit} className="formulario-compra">
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Row>
                <Form.Label id="input-cantidad" className="label-cantidad" column sm={4}>
                    Cantidad
                </Form.Label>
                <Col xs={12} sm={5}>
                    <Form.Control onChange={onChange} name="cantidad" max="9999" defaultValue="1" min="1" type="number" />
                </Col>
            </Row >
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Fecha del turno
                </Form.Label>
                <Col xs={12} sm={5}>
                    {/* <Form.Control onChange={onChange} name="fecha" min={nowFormated} defaultValue={nowFormated} type="date" /> */}
                    <CalendarioTurno onChange={onChange} />
                </Col>
            </Row>
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Hora del turno
                </Form.Label>
                <Col xs={12} sm={5}>
                    <Form.Control onChange={onChange} name="hora" type="time" />
                </Col>
            </Row>
            <Row sm={2}>
                <Col>
                    <Form.Control onChange={onChange} placeholder="Nombre del perro (opcional)" name="nombrePerro" type="text" />
                </Col>
                <Col>
                    <Form.Control onChange={onChange} placeholder="Peso del perro (opcional)" name="presoPerro" type="text" />
                </Col>
            </Row>
            <Row sm={2}>
                <Col>
                    <Form.Control onChange={onChange} placeholder="Edad del perro (opcional)" name="edadPerro" type="text" />
                </Col>
                <Col>
                    <Form.Control onChange={onChange} placeholder="Raza del perro (opcional)" name="razaPerro" type="text" />
                </Col>
            </Row>
            <Row>
                <div className="grupo-botones">
                    <Button type="submit">Agregar al Carrito</Button>
                </div>
            </Row>
        </Form.Group>
    </Form>
}