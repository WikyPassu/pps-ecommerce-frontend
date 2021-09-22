import React from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import "./LoginAdminPage.css";

export default function LoginAdminPage() {
    const OnSubmitForm = (e)=>{

    }
    
    return (<div className="form-login-admin">
        <Form onSubmit={OnSubmitForm} action="/admin/home">
            <b className="title-iniciar-sesion">Iniciar Sesion</b>
            <p>Administracion</p>
            <Row className="mb-3">
                <Form.Group as={Row} controlId="formGridEmail">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control className="form-input" type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group as={Row} controlId="formGridPassword">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control className="form-input" type="password" placeholder="Password" />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">Continuar</Button>
        </Form>
    </div>);
}