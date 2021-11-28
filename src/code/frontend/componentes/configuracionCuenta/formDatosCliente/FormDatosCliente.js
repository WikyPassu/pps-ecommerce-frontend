import React, { useEffect, useState } from 'react'
import { Alert, Col, Form, Row, Button } from 'react-bootstrap';
import EnviosService from '../../../../servicios/EnviosService';

const FormDatosCliente = ({ datosUsuario, onSubmit }) => {
    const [usuario, setUsuario] = useState(datosUsuario);
    const [cambiosRealizados, setCambiosRealizados] = useState(false);

    useEffect(() => {
        setUsuario(datosUsuario);
    }, [datosUsuario])

    const handlerChange = (e) => {
        let { value, name } = e.target;

        if (!cambiosRealizados) {
            setCambiosRealizados(true);
        }

        setUsuario((usuario) => {
            return { ...usuario, [name]: (name === "telefono" || name === "dni") ? parseInt(value) : value };
        })
    }


    const handlerSubmit = (e) => {
        e.preventDefault()
        if (window.confirm("¿Seguro que desea guardar cambios?")) {
            onSubmit(usuario)
        }
    }

    const existeLocalidad = (localidad) => {
        return EnviosService.getPrecioEnvios().find((c) => {
            return c.localidad === localidad;
        });
    }

    return (
        <div>{usuario ?
            <Form onSubmit={handlerSubmit}>
                <h2>Datos del Cliente</h2>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required name="nombre" onChange={handlerChange} value={usuario.nombre} type="text" placeholder="Ingrese Nombre" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control required name="apellido" onChange={handlerChange} value={usuario.apellido} type="text" placeholder="Ingrese Apellido" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>DNI</Form.Label>
                            <Form.Control required min="1000000" max="99999999" name="dni" value={usuario.dni} onChange={handlerChange} type="number" placeholder="Ingrese DNI" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control required name="domicilio" value={usuario.domicilio} onChange={handlerChange} type="text" placeholder="Ingrese Domicilio" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Localidad</Form.Label>
                        <Form.Select name="localidad" value={usuario.localidad} onChange={handlerChange}>
                            <option value="">Otra localidad</option>
                            {EnviosService.getPrecioEnvios()
                                .filter((c) => {
                                    return c.localidad !== "*";
                                })
                                .map((c) => {
                                    return <option
                                        value={c.localidad}
                                        key={c._id}>{c.localidad}</option>

                                })}
                        </Form.Select>
                    </Col>
                    {!existeLocalidad(usuario.localidad) ? <Col>
                        <Form.Label>Otra localidad</Form.Label>
                        <Form.Group>
                            <Form.Control required name="localidad" minLength="3" maxLength="50" onChange={handlerChange} type="text" placeholder="Ingrese su localidad" />
                        </Form.Group>
                    </Col> : ""}
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control required value={usuario.codigoPostal} maxLength="50" name="codigoPostal" onChange={handlerChange} type="text" placeholder="Ingrese correo" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control required value={usuario.telefono} minLength="8" maxLength="12" name="telefono" onChange={handlerChange} type="number" placeholder="Ingrese Telefono" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cambiar Contraseña</Form.Label>
                            <Form.Control required value={usuario.clave} minLength="6" maxLength="16" name="clave" onChange={handlerChange} type="password" placeholder="Ingrese contraseña" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button type="submit" disabled={!cambiosRealizados}>Guardar Cambios</Button>
                    </Col>
                </Row>
            </Form> :
            <Alert variant="warning">No pudo encontrar los datos del cliente</Alert>
        }
        </div>
    )
}

export default FormDatosCliente
