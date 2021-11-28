import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UtilsService from '../../../servicios/UtilsService';
import './Resenia.css';

export default function Resenia({resenia, usuarioLogeado, onClickEliminar}) {
    let { usuario, _id, comentario, fecha } = resenia;
    const [reseniaActual] = useState({
        usuario: usuario ?? "error",
        _id: _id ?? "error",
        comentario: comentario ?? "error",
        fecha: UtilsService.timeStampToStringDate(fecha) //fechaParser(fecha)
    });

    const handlerClickEliminar = ()=> {
        onClickEliminar(reseniaActual);
    }

    return (
        <div className="resenia">
            <Card>
                <Card.Header>
                    {/* <Card.Text className="nombre-usuario">{resenia.usuario.nombre + " " + resenia.usuario.apellido}</Card.Text> */}
                    <Card.Text className="nombre-usuario">{reseniaActual.usuario.nombre + " " + reseniaActual.usuario.apellido}</Card.Text>
                    <Card.Text>
                        {reseniaActual.fecha}
                        {usuarioLogeado && reseniaActual.usuario._id === usuarioLogeado._id ?<Button style={{marginLeft:"20px"}} onClick={handlerClickEliminar}  varian="danger">Borrar</Button>:""}
                    </Card.Text>
                   
                </Card.Header>
                <Card.Body>
                    <Card.Text className="card-comentario">{reseniaActual.comentario}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
};