import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { HiKey, HiMail } from 'react-icons/hi';
import "./LoginAdminPage.css";

export default function LoginAdminPage() {
    const handleSubmit = (e) => {

    }

    return (<div className="form-login-admin">
        <Form onSubmit={handleSubmit} action="/admin/home">
            <b className="title-iniciar-sesion">Iniciar Sesion</b>
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
    </div>);
}