import { useEffect, useState } from "react";
import ProductoService from "../../../servicios/ProductoService";
import Producto from "../producto/Producto";

export default function Resultados({ busqueda }) {
    const [lista, setLista] = useState(null);
    useEffect(() => {
        const realizarBusqueda = async () => {
            let newList = await ProductoService.getProductosPorBusqueda(busqueda);
            console.log("lista",newList);
            setLista(newList);
        }
        realizarBusqueda();
        
    }, [busqueda]);
    return <>
        <h2>Resultados de "{busqueda}"</h2>
        {lista && lista.map((c) => { return <Producto producto={c} key={c._id} /> })}
    </>
}