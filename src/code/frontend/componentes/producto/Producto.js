import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Producto.css';
import { useHistory } from "react-router-dom";
import UtilsService from '../../../servicios/UtilsService';

function useProducto({ _id, nombre, descripcion, precio, imagen }) {
    const [producto] = useState({
        _id: _id || -1,
        nombre: nombre || "Ejemplo Nombre",
        imagen: imagen || "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
        descripcion: descripcion || "Una breve descripcion...",
        precio: precio || -1
    });
    return producto;
}
export default function Producto(props) {
    const { imagen, _id, nombre, descripcion, precio } = useProducto(props.producto);
    const styleImg = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: "contain",
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center"
    }
    const history = useHistory();

    const irAlProducto = () => {
        history.push(`/producto?id=${_id}`);
    }

    return (
        <Card className="card-producto" style={{cursor:"pointer"}}>
            <Card.Img className="image" onClick={irAlProducto} variant="top" style={styleImg} />
            <Card.Body>
                <Card.Title className="nombre">{UtilsService.stringFormatter(nombre,36)}</Card.Title>
                <Card.Text className="descripcion">{UtilsService.stringFormatter(descripcion,95)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text className="precio">${precio}</Card.Text>
                <Button onClick={irAlProducto} variant="primary">Ver Detalles</Button>
            </Card.Footer>
        </Card>
    )
};