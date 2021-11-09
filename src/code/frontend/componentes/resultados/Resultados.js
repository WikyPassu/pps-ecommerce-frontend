import { useEffect, useState } from "react";
import ProductoService from "../../../servicios/ProductoService";
import ServicioService from "../../../servicios/ServicioService";
import Producto from "../producto/Producto";
import Servicio from "../servicio/Servicio";


export default function Resultados({ busqueda, tipo }) {
    const [lista, setLista] = useState([]);
    const [tipoArticulo, setTipoArticulo] = useState(tipo)
    useEffect(() => {
        const realizarBusqueda = async () => {
            let newList;
            if(tipo === "SERVICIO"){
                newList = await ServicioService.getServiciosPorBusqueda(busqueda);
                setTipoArticulo("servicio")
            }
            else{
                newList = await ProductoService.getProductosPorBusqueda(busqueda);
                setTipoArticulo("producto")
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
        
    }, [busqueda,tipo]);
    return <>
        <h2>Resultados de "{busqueda}"</h2>
        {lista && lista.length === 0 ? 
            <b>No se han encontrado productos</b> : 
            lista.map((c) => { return tipoArticulo === "producto" ? <Producto producto={c} key={c._id} /> : <Servicio servicio={c} key={c._id} /> })}
    </>
}