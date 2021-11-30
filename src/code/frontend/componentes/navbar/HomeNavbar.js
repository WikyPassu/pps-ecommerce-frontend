import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './HomeNavbar.css';
import LoginModal from '../../componentes/loginModal/LoginModal';
import Carrito from '../../componentes/carrito/Carrito';
import logo from '../../../../assets/logo.png';
import ClienteService from '../../../servicios/ClienteService';
//import UtilsService from '../../../servicios/UtilsService';
import { useHistory } from 'react-router-dom';

export default function HomeNavbar() {
    const [modalShow, setModalShow] = React.useState(false);
    const [usuarioLogeado] = useState(ClienteService.getUsuario());//ClienteService.getUsuario();
    const history = useHistory();
    const cerrarSesion = ()=>{
        ClienteService.cerrarSesion();
        
        const paginaActual = window.location.pathname;
        
        if(paginaActual == "/home"){
            window.location.reload();
        }
        else{
            history.push("/home");
        }
    }
    return (
        <>
            <Navbar collapseOnSelect fixed="top" className="home-navbar" expand="sm" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => { 
                        //history.push("/") 
                        window.location.href = "/"
                        }}>
                        <img alt="logo-img" width="30px" className="logo-img" src={logo} />
                        Puppyness Pet Caring
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                        </Nav>
                        {
                            usuarioLogeado ?
                                <>
                                    <Nav>
                                        <Nav.Link variant="end">{"Hola! " + usuarioLogeado.apellido + " " + usuarioLogeado.nombre}</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link variant="end" href="/configuracionCuenta">Configuración de Cuenta</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link variant="end" onClick={cerrarSesion}>Cerrar Sesion</Nav.Link>
                                    </Nav>
                                    <Carrito />
                                </>
                                :
                                <Nav>
                                    <Nav.Link variant="end" onClick={() => setModalShow(true)}>Iniciar Sesion</Nav.Link>
                                </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>

    )
};