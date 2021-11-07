import React, { useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';
import './ItemCarrito.css';
import CarritoService from '../../../../servicios/CarritoService';
import UtilsService from '../../../../servicios/UtilsService';

export default function ItemCarrito(props) {
    const {item,cantidad,_id} = props.item; 
    useEffect(() => {
        //console.log("propedad",props)
    })
    return (<>
        <CloseButton className="item-carrito-remover" onClick={()=>{ CarritoService.removeItem(_id)}}  variant="dark" />
        <div className="item-carrito-titulo">{props.mostrarTodo ? item.nombre : UtilsService.stringFormatter(item.nombre,25)}</div><br/>
        <span className="item-carrito-cantidad">X{cantidad}</span>
        <span className="item-carrito-precio"> ${item.precio}</span>
        <br/>
    </>)
};