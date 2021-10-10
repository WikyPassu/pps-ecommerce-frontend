import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Servicio.css';
import { useHistory } from "react-router-dom";

function useProducto({ codigo, nombre, descripcion, precio, imagen }) {
    const [servicio] = useState({
        codigo: codigo || -1,
        nombre: nombre || "Ejemplo Nombre",
        imagen: imagen || "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
        descripcion: descripcion || "Una breve descripcion...",
        precio: precio || -1
    });
    return servicio;
}
export default function Servicio(props) {
    const { imagen, codigo, nombre, descripcion, precio } = useProducto(props.servicio);
    const styleImg = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    const history = useHistory();

    const irAlServicio = () => {
        history.push(`/servicio?codigo=${codigo}`);
    }

    return (
        <Card className="card-servicio">
            <Card.Img className="image" onClick={irAlServicio} variant="top" style={styleImg} />
            <Card.Body>
                <Card.Title className="nombre">{nombre}</Card.Title>
                <Card.Text className="descripcion">{descripcion}</Card.Text>
            </Card.Body>
            <Card.Footer>
                {/* <Card.Text className="precio">${precio}</Card.Text> */}
                <Button onClick={irAlServicio} variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    )
};