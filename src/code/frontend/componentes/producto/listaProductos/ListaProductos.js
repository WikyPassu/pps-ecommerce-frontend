import React from 'react';
import './ListaProductos.css';
import Producto from '../Producto'

export default function ListaProductos(props) {
    return (<div className="lista-productos">
        {props.listaProductos.map((c)=>{return <Producto producto={c} key={c.codigo} />})}
    </div>)
};