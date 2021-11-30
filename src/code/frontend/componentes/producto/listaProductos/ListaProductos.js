import React, { useRef, useState, useEffect } from 'react';
import './ListaProductos.css';
import Producto from '../Producto'
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import ProductoService from "../../../../servicios/ProductoService";
export default function ListaProductos({listaProductos}) {
    const [,setLista] = useState(listaProductos);
    const listaProductosRef = useRef(null);
    const scrollLeft = (e) => {
        listaProductosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaProductosRef.current.scrollTo(listaProductosRef.current.scrollLeft - 180,0);
    }
    const scrollRight = (e) => {
        listaProductosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaProductosRef.current.scrollTo(listaProductosRef.current.scrollLeft + 180,0);
    }

    useEffect(() => {
        const ordenarElementos = async () => {
            setLista(async (lista)=>{
                return await ProductoService.getProductosOrdenados("MAYOR_PRECIO")
            })
        }
        ordenarElementos();
    }, [listaProductos])


    return (<div  className="lista-productos">
        <div><Button onClick={scrollLeft} className="btn-scroll"> <BsCaretLeftFill /> </Button></div>
        <div className="productos" ref={listaProductosRef}>
            {listaProductos.filter((c)=>c.estado === "HABILITADO").map((c) => { return <Producto producto={c} key={c._id} /> })}
        </div>
        <div><Button onClick={scrollRight} className="btn-scroll"> <BsCaretRightFill /> </Button></div>
    </div>)
};