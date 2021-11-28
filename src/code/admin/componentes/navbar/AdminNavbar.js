import React, { useEffect, useState } from 'react';
import './AdminNavbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import logo from '../../../../assets/logo.png';
import EmpleadoService from "../../../servicios/EmpleadoService";
export default function AdminNavbar() {
    const history = useHistory()
    const [usuario, setUsuario] = useState(null);
    useEffect(()=>{
        let usuarioLogeado = EmpleadoService.getUsuario();
        if(usuarioLogeado){
            setUsuario(EmpleadoService.getUsuario());
        }
        else{
            history.push("/admin");
            alert("Acceso denegado")
        }
    },[history])
    return (
        <>
            <Navbar className="home-navbar" variant="dark">
                <Container>
                    <Navbar.Brand  onClick={() => {  
                        window.location.href = "/";
                    }}>
                        <img alt="logo-img" width="25px" className="logo-img" src={logo} />
                        Puppyness Pet Caring
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link  variant="end" className="ml-auto">{usuario?.nombre} {usuario?.apellido} ({usuario?.tipo})</Nav.Link>
                        <Nav.Link  variant="end" className="ml-auto" onClick={() => { 
                            EmpleadoService.cerrarSesion();
                            history.push("/admin");
                        }}>Cerrar Sesion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};