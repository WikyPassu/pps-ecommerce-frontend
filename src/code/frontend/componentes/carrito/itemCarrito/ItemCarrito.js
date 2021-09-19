import React, { useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';
import './ItemCarrito.css';
import CarritoService from '../../../../servicios/CarritoService';

export default function ItemCarrito(props) {
    const {producto,cantidad,id} = props.item; 
    useEffect(() => {
        //console.log("propedad",props)
    })
    return (<>
        <CloseButton className="item-carrito-remover" onClick={()=>{CarritoService.removeItem(id)}}  variant="dark" />
        <div className="item-carrito-titulo">{producto.nombre}</div><br/>
        <span className="item-carrito-cantidad">X{cantidad}</span>
        <span className="item-carrito-precio"> ${producto.precio}</span>
        <br/>
    </>)
};