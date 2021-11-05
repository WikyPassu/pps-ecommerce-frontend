import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import UtilsService from '../../../servicios/UtilsService';
import './Resenia.css';

export default function Resenia(props) {
    let { usuario, _id, comentario, fecha } = props.resenia;
    const [resenia] = useState({
        usuario: usuario ?? "error",
        _id: _id ?? "error",
        comentario: comentario ?? "error",
        fecha: UtilsService.timeStampToStringDate(fecha) //fechaParser(fecha)
    });
    return (
        <div className="resenia">
            <Card>
                <Card.Header>
                    {/* <Card.Text className="nombre-usuario">{resenia.usuario.nombre + " " + resenia.usuario.apellido}</Card.Text> */}
                    <Card.Text className="nombre-usuario">{resenia.usuario.nombre + " " + resenia.usuario.apellido}</Card.Text>
                    <Card.Text>{resenia.fecha}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="card-comentario">{resenia.comentario}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
};