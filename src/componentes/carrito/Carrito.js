import React, { useEffect, useState } from 'react';
import './Carrito.css';
import ItemCarrito from './itemCarrito/ItemCarrito';
import { Dropdown, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CarritoService from '../servicios/CarritoService';


export default function Carrito() {
    const history = useHistory();
    const [items, setItems] = useState({
        lista: CarritoService.getItems(),
        total: CarritoService.getItems().reduce((anterior, actual) => {
            return anterior + actual.precio;
        }, 0)
    })
    CarritoService.subscribe((listaActualizada = []) => {
        setItems({
            lista: listaActualizada,
            total: listaActualizada.reduce((anterior, actual) => {
                return anterior + actual.precio;
            }, 0)
        });
    })

    return (<div>
        <Dropdown>
            <Dropdown.Toggle >
                Carrito
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
                <ListGroup>
                    {items.lista.map((actual) => { return <ListGroup.Item><ItemCarrito nombre={actual.nombre} precio={actual.precio}/></ListGroup.Item> })}
                </ListGroup>
                {items.lista.length ? <ListGroup.Item> <b>Total: ${items.total}</b> </ListGroup.Item> : <ListGroup.Item>No hay productos aun</ListGroup.Item>}
                <Button className="btn-caja" onClick={() => { history.push("/caja") }}>Ir a caja</Button>
            </Dropdown.Menu>
        </Dropdown>
    </div>)
};