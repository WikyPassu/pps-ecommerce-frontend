import React, { useState } from 'react';
import './Carrito.css';
import { Dropdown, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CarritoService from '../../../servicios/CarritoService';
import ListaItemsCarrito from './listaItemsCarrito/ListaItemsCarrito';


export default function Carrito() {
    const [state, setState] = useState({ total:CarritoService.getTotal() })
    const history = useHistory();
    CarritoService.subscribe(()=>{
        setState({ total:CarritoService.getTotal() })
    })

    return (<>
        <Dropdown>
            <Dropdown.Toggle >
                Carrito
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
                <ListGroup className="lista-items-carrito">
                   
                    {CarritoService.getItems().length ?  <><ListaItemsCarrito/><ListGroup.Item> <b>Total: ${state.total}</b> </ListGroup.Item></> : <ListGroup.Item>No hay productos aun</ListGroup.Item>}
                </ListGroup>
                <Button className="btn-caja" onClick={() => { history.push("/caja") }}>Ir a caja</Button>
            </Dropdown.Menu>
        </Dropdown>
    </>)
};