import React from 'react';
import './AdminNavbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import logo from '../../../../assets/logo.png';

export default function AdminNavbar() {
    const history = useHistory()
    return (
        <>
            <Navbar className="home-navbar" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => { history.push("/") }}>
                        <img alt="logo-img" width="25px" className="logo-img" src={logo} />
                        Puppyness Pet Caring
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Notificaciones"
                            menuVariant="primary">
                            <NavDropdown.Item>Notificacion uno</NavDropdown.Item>
                            <NavDropdown.Item>Notificacion dos</NavDropdown.Item>
                            <NavDropdown.Item>Notificacion tres</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Limpiar todo</NavDropdown.Item>
                        </NavDropdown> */}
                        <Nav.Link className="ml-auto" href="#productos">[Nombre Usuario]</Nav.Link>
                        <Nav.Link className="ml-auto" href="#productos">Cerrar Sesion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>

    )
};