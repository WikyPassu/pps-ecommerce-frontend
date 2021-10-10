import React from 'react';
import { Form, Button, Row, InputGroup, FormControl } from 'react-bootstrap';
import { HiKey, HiMail } from 'react-icons/hi';
import "./LoginAdminPage.css";
import logo from '../../../../assets/logo.png';
export default function LoginAdminPage() {
    const handleSubmit = (e) => {

    }

    return (
        <div className="login-admin-page">
            <div className="form-login">
                <div className="logo-container">
                    <b className="title-iniciar-sesion">Iniciar Sesion</b>
                    <img alt="logo-img" width="25px" className="logo-img" src={logo} />
                </div>
                <Form onSubmit={handleSubmit} action="/admin/home">
                    <p>Administracion</p>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text><HiMail /></InputGroup.Text>
                            <FormControl placeholder="Correo" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text><HiKey /></InputGroup.Text>
                            <FormControl placeholder="Contraseña" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <Button type="submit">Continuar</Button>
                        </InputGroup>
                    </Row>
                </Form>
            </div>
        </div>
    );
}