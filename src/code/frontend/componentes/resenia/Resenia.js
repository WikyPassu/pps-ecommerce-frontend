import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './Resenia.css';

function fechaParser(timeStamp){
    const date= (new Date(parseInt(timeStamp+"000")));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export default function Resenia(props) {
    let {usuario,codigo,comentario,fecha} = props.resenia;
    const [resenia] = useState({
        usuario: usuario??"error",
        codigo:codigo??"error",
        comentario:comentario??"error",
        fecha:fechaParser(fecha)
    });
    return (
        <Card className="card-container">
            <Card.Body>
                <Card.Text className="card-fecha">{resenia.fecha}</Card.Text>
                <Card.Title className="card-nombre-usuario">{resenia.usuario.nombre+" "+resenia.usuario.apellido}</Card.Title>
                <Card.Text className="card-comentario">{resenia.comentario}</Card.Text>
            </Card.Body>
        </Card>
    )
};