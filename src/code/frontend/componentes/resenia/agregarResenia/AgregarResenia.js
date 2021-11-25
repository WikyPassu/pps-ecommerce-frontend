import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './AgregarResenia.css';

const initialValuesElemento = {
    "_id":Date.now(),
    "comentario":"",
    "fecha":Date.now(),
    "estado":"ACEPTADA"
};

export default function AgregarResenia({idServicio, onSubmit}) {
    const [resenia, setResenia] = useState(initialValuesElemento);
    const handlerChange = ({target}) => {
        let {value} = target;
        setResenia((resenia)=>{
            return {...resenia,comentario:value};
        })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        onSubmit(resenia);
        
    }
    return (
        <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3" controlId="formResenia">
                <Form.Label className="label-escriba-resenia">Escriba una reseña</Form.Label>
                <Form.Control onChange={handlerChange} value={resenia.comentario} as="textarea" placeholder="Escriba una breve reseña sobre el producto" />
            </Form.Group>
            <Button variant="primary" type="submit">Enviar</Button>
        </Form>
    )
};