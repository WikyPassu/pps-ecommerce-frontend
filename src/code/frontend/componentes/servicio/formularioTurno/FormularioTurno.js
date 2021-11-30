import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ClienteService from '../../../../servicios/ClienteService';
import ServicioService from '../../../../servicios/ServicioService';
import CalendarioTurno from '../calendarioTurno/CalendarioTurno';
import "./FormularioTurno.css";

const initialValues = {
    "servicio": null,
    "dniCliente": null,
    "dniEmpleado": null,
    "perrito": {
        "peso": "",
        "nombre": "",
        "edad": "",
        "raza": ""
    },
    "consumibles": [],
    "fecha": Date.now(),
    "hora": null,
    "precio": null,
    "estado": "PENDIENTE"
}

const initialValuesPerrito = {
    "peso": "",
    "nombre": "",
    "edad": "",
    "raza": ""
}

export default function FormularioTurno({ onSubmit, onChange = () => { }, servicio }) {
    const [usuarioLogeado] = useState(ClienteService.getUsuario());
    const [formulario, setFormulario] = useState(initialValues);
    const [horarios, setHorarios] = useState([]);
    const [diasNoDisponibles, setDiasNoDisponibles] = useState([]);
    const handlerChange = ({ target }) => {
        let { name, value } = target;
        if (name === "hora" && value) {
            setFormulario((formulario) => {
                return { ...formulario, "hora": value};
            })
            const nuevaFecha = new Date(formulario.fecha);
            nuevaFecha.setHours(value.split(":")[0]);
            nuevaFecha.setMinutes(value.split(":")[1]);
            nuevaFecha.setMilliseconds(0);
            nuevaFecha.setSeconds(0);
            value = nuevaFecha.getTime();
            name = "fecha";
        }
        if (name === "perrito") {
            // eslint-disable-next-line
            const perritoEncontrado = usuarioLogeado.perrito.find((c) => c._id == value);
            setFormulario((formulario) => {
                let newFormulario = {
                    ...formulario,
                    "perrito": perritoEncontrado || initialValuesPerrito,
                };
                let { precio, consumibles } = ServicioService.calcularCostoDelServicio(servicio, newFormulario.perrito);
                return {
                    ...newFormulario,
                    precio,
                    consumibles
                }
            })
        }
        else {
            setFormulario((formulario) => {
                return { ...formulario, [name]: value };
            })
        }

    }
    const handlerChangePerrito = ({ target }) => {
        let { name, value } = target;
        if (name === "edad" || name === "peso") {
            value = parseInt(value);
        }
        setFormulario((formulario) => {
            let newFormulario = {
                ...formulario,
                "perrito": {
                    ...formulario.perrito,
                    [name]: value
                }
            }
            let { precio, consumibles } = ServicioService.calcularCostoDelServicio(servicio, newFormulario.perrito);
            return {
                ...newFormulario, precio, consumibles
            }
        })
    }
    useEffect(() => {
        let horarios = ServicioService.getHorariosPorServicio(servicio, new Date(formulario.fecha));
        setDiasNoDisponibles(ServicioService.getDiasNoDisponiblesPorServicio(servicio))
        setHorarios(horarios);
        onChange(formulario);
    }, [formulario, servicio, onChange])

    const handlerSubmit = (e) => {
        e.preventDefault();
        if(usuarioLogeado.estado === "ACTIVO"){
            if (!formulario.fecha || !formulario.hora) {
                alert("Por favor, asegurese de haber establecido una y horario validos");
                return;
            }
            else if (window.confirm("¿Seguro que desea reservar este turno?")) {
                let formularioToSend = formulario;
                formularioToSend.servicio = servicio;
                formularioToSend.dniCliente = usuarioLogeado.dni;
                onSubmit(formularioToSend);
            }
        }
        else{
            alert("No puede reservar turnos porque su usuario esta suspendido")
        }
    }
    return <Form onSubmit={handlerSubmit} className="formulario-compra">
        <Form.Group as={Row}>
            <Row sm={2}>
                <Form.Label className="label-fecha-turno" htmlFor="fecha" column sm={4}>
                    Fecha del turno
                </Form.Label>
                <Col>
                    {/* <Form.Control onChange={handlerChange} name="fecha" min={nowFormated} defaultValue={nowFormated} type="date" /> */}
                    <CalendarioTurno name="fecha" value={formulario.fecha} onChange={handlerChange} diasNoDisponibles={diasNoDisponibles} />
                </Col>
            </Row>
            <Row sm={2}>
                <Form.Label htmlFor="hora" className="label-fecha-turno" column sm={4}>
                    Hora del turno
                </Form.Label>
                <Col>
                    <Form.Select required onChange={handlerChange} name="hora">
                        <option>Seleccione un horario</option>
                        {horarios.map((c) => <option value={c} key={c}>{c} Hs</option>)}
                    </Form.Select>
                    {/* <Form.Control required value={formulario.hora} onChange={handlerChange} name="hora" type="time" /> */}
                </Col>
            </Row>
            {/* <Row>
                <Form.Label className="label-fecha-turno" column sm={4}>
                    Mis Perros
                </Form.Label>
                <Col>
                    {usuarioLogeado.perrito.length ?
                        <Form.Select name="perrito" onChange={handlerChange}>
                            <option>Seleccionar perrito</option>
                            {usuarioLogeado.perrito.map((c) => {
                                return <option value={c._id}>{c.nombre}</option>
                            })}
                        </Form.Select> :
                        <Form.Select disabled>
                            <option>No tiene perros guardados</option>
                        </Form.Select>
                    }

                </Col>
            </Row> */}
            <Row sm={2}>
                <Col>
                    <Form.Control required onChange={handlerChangePerrito} value={formulario.perrito.nombre} placeholder="Nombre del perro" min="3" max="99999" name="nombre" type="text" />
                </Col>
                <Col>
                    <Form.Control required onChange={handlerChangePerrito} value={formulario.perrito.peso} placeholder="Peso del perro (kilos)" min="1" max="99999" name="peso" type="number" />
                </Col>
            </Row>
            <Row sm={2}>
                <Col>
                    <Form.Control required onChange={handlerChangePerrito} value={formulario.perrito.edad} placeholder="Edad del perro (años)" min="1" max="99" name="edad" type="number" />
                </Col>
                <Col>
                    {/* <Form.Select required onChange={handlerChangePerrito} value={formulario.perrito.raza} name="raza" defaultValue="Seleccione raza">
                        <option>Seleccione raza</option>
                        <option value="labrador">Labrador</option>
                        <option value="siberiano">Siberiano</option>
                        <option value="caniche">Caniche</option>
                    </Form.Select> */}
                    <Form.Control required onChange={handlerChangePerrito} value={formulario.perrito.raza} placeholder="Raza del perro" min="3" max="99999" name="raza" type="text" />
                </Col>
            </Row>
            <Row>
                <div className="grupo-botones">
                    <Button type="submit">Solicitar Turno</Button>
                </div>
            </Row>
            {/* <Row>
                <div className="grupo-botones">
                    <Button>Guardar cambios</Button>
                </div>
            </Row> */}
        </Form.Group>
    </Form>
}