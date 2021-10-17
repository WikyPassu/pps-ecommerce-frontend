import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './HomeNavbar.css';
import LoginModal from '../../componentes/loginModal/LoginModal';
import Carrito from '../../componentes/carrito/Carrito';
import logo from '../../../../assets/logo.png';
export default function HomeNavbar(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();
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
                        <Nav>
                            <Nav.Link variant="end" onClick={() => setModalShow(true)} href="#login">Iniciar Sesion</Nav.Link>
                        </Nav>
                        <Nav>
                            {/* <Nav.Link variant="end" onClick={() => setModalShow(true)} href="#login">[Nombre Usuario]</Nav.Link>
                            <Nav.Link variant="end" onClick={() => setModalShow(true)} href="#login">Cerrar Sesion</Nav.Link> */}
                        </Nav>
                        <Carrito />
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