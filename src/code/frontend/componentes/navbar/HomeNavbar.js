import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './HomeNavbar.css';
import LoginModal from '../../componentes/loginModal/LoginModal';
import Carrito from '../../componentes/carrito/Carrito';
import logo from '../../../../assets/logo.png';
import ClienteService from '../../../servicios/ClienteService';
import UtilsService from '../../../servicios/UtilsService';

export default function HomeNavbar() {
    const [modalShow, setModalShow] = React.useState(false);
    const [usuarioLogeado, setUsuarioLogeado] = useState(ClienteService.getUsuario());//ClienteService.getUsuario();
    const history = useHistory();

    // useEffect(() => {
    //     usuarioLogeado = ClienteService.getUsuario();
    // })

    const cerrarSesion = ()=>{
        UtilsService.setLoading(true);
        ClienteService.cerrarSesion()
        .then(()=>{
            setUsuarioLogeado(ClienteService.getUsuario());
            setTimeout(()=>{
                UtilsService.setLoading(false);
                history.push("/")
            },5000)
        })
        //ClienteService.cerrarSesion()
    }
    return (
        <>
            <Navbar collapseOnSelect fixed="top" className="home-navbar" expand="sm" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => { history.push("/") }}>
                        <img alt="logo-img" width="30px" className="logo-img" src={logo} />
                        Puppyness Pet Caring
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#productos">Productos</Nav.Link>
                            <Nav.Link href="#servicios">Sevicios</Nav.Link> */}
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