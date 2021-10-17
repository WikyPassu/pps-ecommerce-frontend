import { Form, Row, Col, Button } from 'react-bootstrap';
import CalendarioTurno from '../calendarioTurno/CalendarioTurno';
import "./FormularioCompra.css";
export default function FormularioCompra({ onSubmit, onChange }) {
    return <Form onSubmit={onSubmit} className="formulario-compra">
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Fecha del turno
                </Form.Label>
                <Col>
                    {/* <Form.Control onChange={onChange} name="fecha" min={nowFormated} defaultValue={nowFormated} type="date" /> */}
                    <CalendarioTurno onChange={onChange} />
                </Col>
            </Row>
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Hora del turno
                </Form.Label>
                <Col>
                    <Form.Control required onChange={onChange} name="hora" type="time" />
                </Col>
            </Row>
            <Row>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Mis Perros
                </Form.Label>
                <Col>
                    <Form.Select disabled>
                        <option>Seleccionar perrito</option>
                        <option value="retiro_local">perro 1</option>
                        <option value="a_domicilio">perro 2</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row sm={2}>
                <Col>
                    <Form.Control onChange={onChange} placeholder="Nombre del perro" min="1" max="9999" name="nombrePerro" type="text" />
                </Col>
                <Col>
                    <Form.Control required onChange={onChange} placeholder="Peso del perro" min="1" max="9999" name="presoPerro" type="text" />
                </Col>
            </Row>
            <Row sm={2}>
                <Col>
                    <Form.Control required onChange={onChange} placeholder="Edad del perro" min="1" max="9999" name="edadPerro" type="text" />
                </Col>
                <Col>
                    <Form.Select required defaultValue="Seleccione raza">
                        <option>Seleccione raza</option>
                        <option value="retiro_local">perro 1</option>
                        <option value="a_domicilio">perro 2</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <div className="grupo-botones">
                    <Button type="submit">Solicitar Turno</Button>
                </div>
            </Row>
            <Row>
                <div className="grupo-botones">
                    <Button>Guardar cambios</Button>
                </div>
            </Row>
        </Form.Group>
    </Form>
}