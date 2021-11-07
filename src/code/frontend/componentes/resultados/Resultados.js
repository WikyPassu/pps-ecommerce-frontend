import { useState } from "react";
import ProductoService from "../../../servicios/ProductoService";
import Producto from "../producto/Producto";

export default function Resultados({busqueda}){
    const [lista] = useState(ProductoService.getProductos());

    // useEffect(() => {
    //     ProductoService.getProductosPorBusqueda({busqueda:busqueda});
    // }, [])
    return <>
        <h2>Resultados de "{busqueda}"</h2>
        <div className="resultados">
            {lista.map((c) => { return <Producto producto={c} key={c._id} /> })}
        </div>
    </>
}