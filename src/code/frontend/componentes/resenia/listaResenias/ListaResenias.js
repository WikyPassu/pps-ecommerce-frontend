import React, { useEffect, useState } from 'react';
import ClienteService from '../../../../servicios/ClienteService';
import ServicioService from '../../../../servicios/ServicioService';
import Resenia from '../Resenia';
import './ListaResenias.css';
export default function ListaResenias({listaResenias, servicio}) {
    const [lista,setLista] = useState([]);
    const [usuarioLogeado, setUsuarioLogeado] = useState(null);
    useEffect(()=>{
        setUsuarioLogeado(()=>{
            return ClienteService.getUsuario();
        })
        setLista(()=>{
            console.log("seteando lista")
            return listaResenias.filter((c)=>c.estado === "ACEPTADA");
        })
    },[listaResenias])

    const handlerClickEliminar = async (reseniaEliminar) => {
        await ServicioService.removeResenia(reseniaEliminar._id, servicio._id);
        window.location.reload();
    }

    return (<>
        {(!lista.length)?
        <div className="no-resenias">No se han encontrado reseñas</div> : 
        <div>
            {lista.map(c=><Resenia resenia={c} key={c._id} usuarioLogeado={usuarioLogeado} onClickEliminar={handlerClickEliminar} />)} {console.log(lista)}
        </div>}
    </>)
};