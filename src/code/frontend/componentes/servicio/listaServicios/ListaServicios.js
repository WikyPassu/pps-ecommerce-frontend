import React, { useRef } from 'react';
import './ListaServicios.css';
import Servicio from '../Servicio'
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';
export default function ListaServicios({lista}) {
    const listaRef = useRef(null);
    const scrollLeft = (e) => {
        listaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaRef.current.scrollTo(listaRef.current.scrollLeft - 180,0);
    }
    const scrollRight = (e) => {
        listaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        listaRef.current.scrollTo(listaRef.current.scrollLeft + 180,0);
    }
    return (<div  className="lista-servicios">
        <div><Button onClick={scrollLeft} className="btn-scroll"> <BsCaretLeftFill /> </Button></div>
        <div className="servicios" ref={listaRef}>
            {lista.map((c) => { return <Servicio servicio={c} key={c._id} /> })}
        </div>
        <div><Button onClick={scrollRight} className="btn-scroll"> <BsCaretRightFill /> </Button></div>
    </div>)
};