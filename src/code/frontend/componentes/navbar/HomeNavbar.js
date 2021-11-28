import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './HomeNavbar.css';
import LoginModal from '../../componentes/loginModal/LoginModal';
import Carrito from '../../componentes/carrito/Carrito';
import logo from '../../../../assets/logo.png';
import ClienteService from '../../../servicios/ClienteService';
//import UtilsService from '../../../servicios/UtilsService';

export default function HomeNavbar() {
    const [modalShow, setModalShow] = React.useState(false);
    const [usuarioLogeado] = useState(ClienteService.getUsuario());//ClienteService.getUsuario();

    const cerrarSesion = ()=>{
        ClienteService.cerrarSesion()
        window.location.reload();
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
                                        <Nav.Link variant="end" onClick={cerrarSesion} href="#login">Cerrar Sesion</Nav.Link>
                                    </Nav>
                                    <Carrito />
                                </>
                                :
                                <Nav>
                                    <Nav.Link variant="end" onClick={() => setModalShow(true)} href="#login">Iniciar Sesion</Nav.Link>
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