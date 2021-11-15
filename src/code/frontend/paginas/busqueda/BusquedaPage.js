import { useLocation } from "react-router";
import HomeNavbar from "../../componentes/navbar/HomeNavbar";
import './BusquedaPage.css';
import Filtros from "../../componentes/filtros/Filtros";
import Resultados from "../../componentes/resultados/Resultados";
import { useEffect, useState } from "react";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function BusquedaPage(){
    const query = useQuery().get("q");
    const tipo = useQuery().get("type");
    const [filtros, setFiltros] = useState(null);
    useEffect(()=>{
        window.scrollTo(0,0);
    })

    const hanlderChangeFiltros = (e) => {
        setFiltros(e)
    }
    return <>
    <HomeNavbar/>
    <div className="busqueda-container">
        <div className="filtros">
            <Filtros onChange={hanlderChangeFiltros} defaultType={tipo}/>
        </div>
        <div className="resultados">
            <Resultados filtros={filtros} busqueda={query} tipo={tipo}/>
        </div>
    </div>
    
    </>;
}