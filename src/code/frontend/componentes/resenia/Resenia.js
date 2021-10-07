import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './Resenia.css';

function fechaParser(timeStamp) {
    const date = (new Date(parseInt(timeStamp + "000")));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export default function Resenia(props) {
    let { usuario, codigo, comentario, fecha } = props.resenia;
    const [resenia] = useState({
        usuario: usuario ?? "error",
        codigo: codigo ?? "error",
        comentario: comentario ?? "error",
        fecha: fechaParser(fecha)
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