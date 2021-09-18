import React, { useState } from 'react';
import CarritoService from '../../../../servicios/CarritoService';
import ItemCarrito from '../itemCarrito/ItemCarrito';
function ListaItemsCarrito() {
    const [items, setItems] = useState({ lista: CarritoService.getItems() })
    CarritoService.subscribe((listaActualizada = []) => {
        setItems({ lista: listaActualizada });
    })
    return (<>
        {items.lista.map((actual) => { return <div className="item-producto-carrito"><ItemCarrito nombre={actual.nombre} precio={actual.precio}/></div> })}
    </>);
}

export default ListaItemsCarrito;