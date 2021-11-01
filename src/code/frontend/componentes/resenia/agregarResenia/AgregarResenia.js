import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ClienteService from '../../../../servicios/ClienteService';
import ServicioService from '../../../../servicios/ServicioService';
//import UtilsService from '../../../../servicios/UtilsService';
import './AgregarResenia.css';

const initialValuesElemento = {
    "usuario": ClienteService.getUsuario(),
    "id":Date.now(),
    "comentario":"",
    "fecha":Date.now(),
    "estado":"PENDIENTE"
};

export default function AgregarResenia({idServicio, onUpdate}) {
    const [resenia, setResenia] = useState(initialValuesElemento);

    const handlerChange = ({target}) => {
        let {value} = target;
        setResenia((resenia)=>{
            return {...resenia,comentario:value};
        })
    }

    const handlerSubmit = (e) => {
        // UtilsService.setLoading(true);
        e.preventDefault();
        setResenia(initialValuesElemento);
        ServicioService.addResenia(resenia,idServicio);
		// setTimeout(()=>{
		// 	UtilsService.setLoading(false);
		// },2000);
        //onUpdate();
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