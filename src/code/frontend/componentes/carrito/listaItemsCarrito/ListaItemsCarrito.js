import React, { useState } from 'react';
import CarritoService from '../../../../servicios/CarritoService';
import ItemCarrito from '../itemCarrito/ItemCarrito';
import "./ListaItemsCarrito.css";
function ListaItemsCarrito() {
    const [items, setItems] = useState({ lista: CarritoService.getItems() })
    CarritoService.subscribe((listaActualizada = []) => {
        setItems({ lista: listaActualizada });
    })
    return (<>
    {items.lista.map((itemCarrito) => { return <div className="item-producto-carrito"><ItemCarrito  item={itemCarrito}/></div> })}
    </>);
}

export default ListaItemsCarrito;