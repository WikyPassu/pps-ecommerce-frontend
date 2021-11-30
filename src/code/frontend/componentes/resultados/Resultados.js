import { useEffect, useState } from "react";
import ProductoService from "../../../servicios/ProductoService";
import ServicioService from "../../../servicios/ServicioService";
import Producto from "../producto/Producto";
import Servicio from "../servicio/Servicio";


export default function Resultados({ busqueda, tipo, filtros }) {
    const [lista, setLista] = useState([]);
    const [tipoArticulo, setTipoArticulo] = useState(tipo)
    useEffect(() => {
        //setTipoArticulo(tipo);
        const realizarBusqueda = async () => {
            let newList;
            if(tipo === "SERVICIO"){
                newList = await ServicioService.getServiciosPorBusqueda(busqueda);
                setTipoArticulo("SERVICIO")
            }
            else{
                newList = await ProductoService.getProductosPorBusqueda(busqueda);
                setTipoArticulo("PRODUCTO")
            }
            console.log("Filtros: ",filtros);
            console.log("resultados: ", newList);
            if(filtros){
                if(filtros.categoria){
                    newList = newList?.filter((c)=>{
                        return c.categoria === filtros.categoria;
                    })
                }
                if(filtros.maximo){
                    newList = newList?.filter((c)=>{
                        return c.precio <= filtros.maximo;
                    })
                }
                if(filtros.minimo){
                    newList = newList?.filter((c)=>{
                        return c.precio >= filtros.minimo;
                    })
                }
            }
            if(newList && newList.length){
                console.log("new List",newList)
                setLista(newList);
            }
            else{
                setLista([]);
            }
        }
        realizarBusqueda();
        
    }, [busqueda,filtros,tipo]);
    return <>
        <h2>Resultados de "{busqueda}"</h2>
        {lista && lista.length === 0 ? 
            <b>No se ha encontrado ningún resultado</b> : 
            lista.map((c) => { return tipoArticulo === "PRODUCTO" ? <Producto producto={c} key={c._id} /> : <Servicio servicio={c} key={c._id} /> })}
    </>
}