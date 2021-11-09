import { useLocation } from "react-router";
import HomeNavbar from "../../componentes/navbar/HomeNavbar";
import './BusquedaPage.css';
import Filtros from "../../componentes/filtros/Filtros";
import Resultados from "../../componentes/resultados/Resultados";
import { useEffect } from "react";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function BusquedaPage(){
    const query = useQuery().get("q");
    const tipo = useQuery().get("type");

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return <>
    <HomeNavbar/>
    <div className="busqueda-container">
        <div className="filtros">
            <Filtros/>
        </div>
        <div className="resultados">
            <Resultados busqueda={query} tipo={tipo}/>
        </div>
    </div>
    
    </>;
}