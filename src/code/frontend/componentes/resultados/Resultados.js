import { useEffect, useState } from "react";
import ProductoService from "../../../servicios/ProductoService";
import ServicioService from "../../../servicios/ServicioService";
import Producto from "../producto/Producto";

export default function Resultados({ busqueda, tipo }) {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        const realizarBusqueda = async () => {
            let newList;
            if(tipo === "SERVICIO"){
                newList = await ServicioService.getServiciosPorBusqueda(busqueda);
            }
            else{
                newList = await ProductoService.getProductosPorBusqueda(busqueda);
            }
            console.log("lista",newList);
            if(newList){
                console.log("new List",newList)
                setLista(newList);
            }
            else{
                setLista([]);
            }
        }
        realizarBusqueda();
        
    }, [busqueda]);
    return <>
        <h2>Resultados de "{busqueda}"</h2>
        {lista && lista.length === 0 ? 
            <b>No se han encontrado productos</b> : 
            lista.map((c) => { return <Producto producto={c} key={c._id} /> })}
    </>
}