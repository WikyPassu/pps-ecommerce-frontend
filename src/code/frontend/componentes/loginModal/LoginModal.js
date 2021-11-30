import React, { useState } from 'react';
import './LoginModal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
//import { useHistory } from 'react-router';
import ClienteService from '../../../servicios/ClienteService';
import UtilsService from '../../../servicios/UtilsService';
import EnviosService from '../../../servicios/EnviosService';

const initialValuesFormLogin = {
    correo: "",
    clave: ""
}

// const initialValuesFormRegistracion = {
//     //"_id":"cli02",
//     "nombre":"",
//     "apellido":"",
//     "dni":null,
//     "correo":"",
//     "clave":"",
//     "domicilio":"",
//     "localidad":"",
//     "telefono":null,
//     "codigoPostal":"",
//     "perrito":[],
//     "estado":"ACTIVO"
// }

const initialValuesFormRegistracion = {
    "nombre": "",
    "apellido": "",
    "dni": 0,
    "correo": "",
    "clave": "",
    "domicilio": "",
    "localidad": "",
    "telefono": 0,
    "codigoPostal": 0,
    "perrito": [],
    "estado": "ACTIVO"
};

export default function LoginModal(props) {
    const [modoRegistracion, setModoRegistracion] = useState(false);
    const [formLogin, setFormLogin] = useState(initialValuesFormLogin);
    const [formRegistracion, setFormRegistracion] = useState(initialValuesFormRegistracion);

    //const history = useHistory();

    const cambiarModo = () => {
        setModoRegistracion(!modoRegistracion);
    }

    const handlerChangeLogin = (e) => {
        e.preventDefault();
        const { value, name } = e.target;

        setFormLogin((formLogin) => {
            return { ...formLogin, [name]: value };
        })
    }

    const handlerChangeRegistracion = (e) => {
        let { value, name } = e.target;
        if (name === "telefono" || name === "dni") {
            value = parseInt(value)
        }
        setFormRegistracion((formRegistracion) => {
            return { ...formRegistracion, [name]: value };
        })
    }

    const handlerSubmitLogin = (e) => {
        e.preventDefault();
        UtilsService.setLoading(true);
        ClienteService.login(formLogin.correo, formLogin.clave)
        .then((value) => {
            const usuarioLogueado = ClienteService.getUsuario();
            if(usuarioLogueado.estado !== "BAJA"){
                if(value){
                    window.location.reload();
                    props.onHide();
                }
                else{
                    alert("No se ha podido iniciar sesion. Verifique que los datos ingresados sean correctos");
                }
            }
            else{
                alert("No se ha podido iniciar sesion. Verifique que los datos ingresados sean correctos");
            }
        })
        .catch(()=>{
            alert("No se ha podido iniciar sesion. Verifique que los datos ingresados sean correctos");
        })
        .finally(()=>{
            UtilsService.setLoading(false);
        })
    }

    const handlerSubmitRegistracion = (e) => {
        e.preventDefault();
        const nombre = formRegistracion.nombre;
        const apellido = formRegistracion.apellido;

        if(UtilsService.hasNumeros(nombre)){
                alert("Por favor, ingrese un nombre válido");
                return;
        }
        else if(UtilsService.hasNumeros(apellido)){
            alert("Por favor, ingrese un apellido válido");
            return;
        }

        formRegistracion.nombre = UtilsService.ponerMayusIniciales(formRegistracion.nombre);
        formRegistracion.apellido = UtilsService.ponerMayusIniciales(formRegistracion.apellido);
        
        ClienteService.signUp(formRegistracion)
            .then(() => {
                window.location.reload();
                props.onHide();
            });
    }
    const existeLocalidad = (localidad) => {
        return EnviosService.getPrecioEnvios().find((c) => {
            return c.localidad === localidad;
        });
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            className="login-modal">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modoRegistracion ? "Registrarse" : "Iniciar Sesión"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={modoRegistracion ? handlerSubmitRegistracion : handlerSubmitLogin}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control required type="email" onChange={modoRegistracion ? handlerChangeRegistracion : handlerChangeLogin} name="correo" placeholder="Ingrese correo" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label varaint="pink">Contraseña</Form.Label>
                                <Form.Control required type="password" onChange={modoRegistracion ? handlerChangeRegistracion : handlerChangeLogin} name="clave" placeholder="Ingrese contraseña" />
                            </Form.Group>
                        </Col>
                    </Row>
                    {modoRegistracion ?
                        <>
                            {/* <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label varaint="pink">Confirmar contraseña</Form.Label>
                                        <Form.Control required type="password" placeholder="Ingrese contraseña" />
                                    </Form.Group>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control required name="nombre" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese su nombre" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control required name="apellido" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese su apellido" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>DNI</Form.Label>
                                        <Form.Control required min="1000000" max="99999999" name="dni" onChange={handlerChangeRegistracion} type="number" placeholder="Ingrese DNI" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Domicilio</Form.Label>
                                        <Form.Control required name="domicilio" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese domicilio" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Localidad</Form.Label>
                                    <Form.Select name="localidad" value={formRegistracion.localidad} onChange={handlerChangeRegistracion}>
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
                                {!existeLocalidad(formRegistracion.localidad) ? <Col>
                                    <Form.Label>Otra localidad</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Control required name="localidad" minLength="3" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese su localidad" />
                                    </Form.Group>
                                </Col> : ""}
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                
                                    <Form.Group className="mb-3">
                                        <Form.Label>Código Postal</Form.Label>
                                        <Form.Control required name="codigoPostal" onChange={handlerChangeRegistracion} type="text" placeholder="Ingrese código postal" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control type="number" required name="telefono" onChange={handlerChangeRegistracion} placeholder="Ingrese teléfono" />
                                      
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={cambiarModo} variant="link">¿Ya tenés una cuenta? <b>Iniciá sesión</b></Button>
                                </Col>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Col style={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={cambiarModo} variant="link">¿No tenés cuenta? <b>Registrate ahora</b></Button>
                                </Col>
                            </Row>
                        </>
                    }
                    <br />
                    <div style={{textAlign:"center"}}>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    </div>
                </Form>

            </Modal.Body>
        </Modal>
    );
}