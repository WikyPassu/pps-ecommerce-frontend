import React from 'react';
import './AdminNavbar.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function AdminNavbar() {
    return (
        <div>
            <Navbar className="home-navbar" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Puppyness Pet Caring</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Notificaciones"
                            menuVariant="primary">
                            <NavDropdown.Item>Notificacion uno</NavDropdown.Item>
                            <NavDropdown.Item>Notificacion dos</NavDropdown.Item>
                            <NavDropdown.Item>Notificacion tres</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Limpiar todo</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link className="ml-auto" href="#productos">Cerrar Sesion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    )
};