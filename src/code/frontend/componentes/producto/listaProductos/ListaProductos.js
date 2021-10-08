import React, { useRef } from 'react';
import './ListaProductos.css';
import Producto from '../Producto'
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
export default function ListaProductos({listaProductos}) {
    const listaProductosRef = useRef(null);
    const scrollLeft = (e) => {
        listaProductosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaProductosRef.current.scrollTo(listaProductosRef.current.scrollLeft - 180,0);
    }
    const scrollRight = (e) => {
        listaProductosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaProductosRef.current.scrollTo(listaProductosRef.current.scrollLeft + 180,0);
    }
    return (<div  className="lista-productos">
        <div><Button onClick={scrollLeft} className="btn-scroll"> <BsCaretLeftFill /> </Button></div>
        <div className="productos" ref={listaProductosRef}>
            {listaProductos.map((c) => { return <Producto producto={c} key={c.codigo} /> })}
        </div>
        <div><Button onClick={scrollRight} className="btn-scroll"> <BsCaretRightFill /> </Button></div>
    </div>)
};