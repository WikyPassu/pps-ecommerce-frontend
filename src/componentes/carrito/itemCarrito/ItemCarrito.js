import React, { useEffect } from 'react';
import './ItemCarrito.css';
import { CloseButton } from 'react-bootstrap';
import CarritoService from '../../servicios/CarritoService';

export default function ItemCarrito(props) {
    useEffect(() => {
        console.log("propedad",props)
    })
    return (<div>
        <CloseButton className="item-carrito-remover" onClick={()=>{CarritoService.removeItem()}}  variant="dark" />
        <div className="item-carrito-titulo">{props.nombre}</div><br/>
        <span className="item-carrito-cantidad">x4</span>
        <span className="item-carrito-precio"> ${props.precio}</span>
        <br/>
    </div>)
};