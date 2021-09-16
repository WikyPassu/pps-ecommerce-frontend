import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './Resenia.css';

function fechaParser(timeStamp){
    const date= (new Date(parseInt(timeStamp+"000")));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
function useResenia({usuario,codigo,comentario,fecha}) {
    const [resenia] = useState({
        usuario: usuario,
        codigo:codigo,
        comentario:comentario,
        fecha:fechaParser(fecha)
    });
    return resenia;
}
export default function Resenia(props) {
    const resenia = useResenia(props.resenia);
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