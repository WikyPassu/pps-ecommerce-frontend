import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Producto.css';
import { useHistory } from "react-router-dom";

function useProducto({ codigo, nombre, descripcion, precio, imagen }) {
    const [producto] = useState({
        codigo: codigo || -1,
        nombre: nombre || "Ejemplo Nombre",
        imagen: imagen || "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
        descripcion: descripcion || "Una breve descripcion...",
        precio: precio || -1
    });
    return producto;
}
export default function Producto(props) {
    const { imagen, codigo, nombre, descripcion, precio } = useProducto(props.producto);
    const styleImg = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
    const history = useHistory();

    const irAlProducto = () => {
        history.push(`/producto?codigo=${codigo}`);
    }

    return (
        <Card className="card-producto">
            <Card.Img className="card-image" onClick={irAlProducto} variant="top" style={styleImg} />
            <Card.Body>
                <Card.Title className="card-nombre">{nombre}</Card.Title>
                <Card.Text className="card-descripcion">{descripcion}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text className="card-precio">${precio}</Card.Text>
                <Button onClick={irAlProducto} variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    )
};