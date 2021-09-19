import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './AgregarResenia.css';

export default function AgregarResenia() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formResenia">
                <Form.Label className="label-escriba-resenia">Escriba una reseña</Form.Label>
                <Form.Control as="textarea" placeholder="Escriba una breve reseña sobre el producto" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    )
};