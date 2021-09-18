import React from 'react';
import Resenia from '../Resenia';
import './ListaResenias.css';
export default function ListaResenias(props) {
    return (<>
        {(!props.listaResenias)?<div className="no-resenias">No se han encontrado reseñas</div> :props.listaResenias.map(c=><Resenia resenia={c} key={c.codigo} />)}
    </>)
};