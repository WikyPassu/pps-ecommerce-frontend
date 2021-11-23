import React, { useEffect, useState } from 'react';
import Resenia from '../Resenia';
import './ListaResenias.css';
export default function ListaResenias({listaResenias}) {
    const [lista,setLista] = useState([]);
    useEffect(()=>{
        setLista(()=>{
            console.log("seteando lista")
            return listaResenias.filter((c)=>c.estado === "ACEPTADA");
        })
    },[listaResenias])
    return (<>
        {(!lista.length)?<div className="no-resenias">No se han encontrado reseñas</div> : <div>{lista.map(c=><Resenia resenia={c} key={c._id} />)} {console.log(lista)}</div>}
    </>)
};