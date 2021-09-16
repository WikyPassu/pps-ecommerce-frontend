import React from 'react';
import './HomeNavbar.css';
import LoginModal from '../loginModal/LoginModal';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Carrito from '../carrito/Carrito';
import { useHistory } from 'react-router';
import foto from '../../assets/logo.png';
export default function HomeNavbar(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();
    return (
        <>
            <Navbar className="home-navbar" variant="dark">
                <Container>
                    <Navbar.Brand onClick={()=>{history.push("/")}}>
                        <img alt="logo-img" width="40px" className="logo-img" src={foto}/>
                        Puppyness Pet Caring
                        </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#productos">Productos</Nav.Link>
                        <Nav.Link href="#servicios">Sevicios</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link variant="end" onClick={() => setModalShow(true)} href="#login">Iniciar Sesion</Nav.Link>
                    </Nav>
                    <Carrito />
                </Container>
            </Navbar>

            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>

    )
};