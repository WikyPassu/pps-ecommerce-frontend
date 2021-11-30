import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Servicio.css';
import { useHistory } from "react-router-dom";
import UtilsService from '../../../servicios/UtilsService';

function useProducto({ _id, nombre, descripcion, precio, imagen }) {
    const [servicio] = useState({
        _id: _id || -1,
        nombre: nombre || "Ejemplo Nombre",
        imagen: imagen || "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
        descripcion: descripcion || "Una breve descripcion...",
        precio: precio || -1
    });
    return servicio;
}
export default function Servicio(props) {
    const { imagen, _id, nombre, descripcion } = useProducto(props.servicio);
    const styleImg = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    const history = useHistory();

    const irAlServicio = () => {
        history.push(`/servicio?id=${_id}`);
    }

    return (
        <Card className="card-servicio" style={{cursor:"pointer"}}>
            <Card.Img className="image" onClick={irAlServicio} variant="top" style={styleImg} />
            <Card.Body>
                <Card.Title className="nombre">{UtilsService.stringFormatter(nombre,36)}</Card.Title>
                <Card.Text className="descripcion">{UtilsService.stringFormatter(descripcion,95)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                {/* <Card.Text className="precio">${precio}</Card.Text> */}
                <Button onClick={irAlServicio} variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    )
};