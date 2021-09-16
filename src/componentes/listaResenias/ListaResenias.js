import React from 'react';
import Resenia from '../resenia/Resenia';
import './ListaResenias.css';
export default function ListaResenias(props) {
    return (<div>
        {(!props.listaResenias)?<div className="no-resenias">No se han encontrado reseñas</div> :props.listaResenias.map(c=><Resenia resenia={c} key={c.codigo} />)}
    </div>)
};