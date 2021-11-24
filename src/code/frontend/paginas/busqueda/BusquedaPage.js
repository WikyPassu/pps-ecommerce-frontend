import { useLocation, useHistory } from "react-router";
import HomeNavbar from "../../componentes/navbar/HomeNavbar";
import './BusquedaPage.css';
import Filtros from "../../componentes/filtros/Filtros";
import Resultados from "../../componentes/resultados/Resultados";
import { useEffect, useState } from "react";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const initialState = {
    tipo: "PRODUCTO",
    minimo: 0,
    maximo: 0,
    categoria: "",
    busqueda: ""
}

export default function BusquedaPage() {
    const query = useQuery().get("q");
    const history = useHistory();
    const tipo=useQuery().get("type");
    const [filtros, setFiltros] = useState(initialState);
    useEffect(() => {
        window.scrollTo(0, 0);
    },[filtros])

    const handlerSubmitFiltros = (e) => {
        history.push("/busqueda?q="+query+"&type=" + e.tipo);
        console.log(e);
        setFiltros(e);
    }
    return <>
        <HomeNavbar />
        <div className="busqueda-container">
            <div className="filtros">
                <Filtros onSumbit={handlerSubmitFiltros} defaultType={tipo} />
            </div>
            <div className="resultados">
                <Resultados filtros={filtros} busqueda={query} tipo={tipo} />
            </div>
        </div>

    </>;
}