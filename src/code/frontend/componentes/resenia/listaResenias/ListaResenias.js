import React from 'react';
import Resenia from '../Resenia';
import './ListaResenias.css';
export default function ListaResenias({listaResenias}) {
    return (<>
        {(!listaResenias && !listaResenias.length)?
        <div className="no-resenias">No se han encontrado reseñas</div> :listaResenias.map(c=><Resenia resenia={c} key={c._id} />)}
    </>)
};