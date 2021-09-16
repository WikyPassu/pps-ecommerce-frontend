import React, { useEffect } from 'react';
import "./ResultadoTransaccion.css";
import { useHistory } from 'react-router-dom';
import HomeNavbar from '../../../navbar/HomeNavbar';
function ResultadoTransaccion() {
    const history = useHistory();
    useEffect(()=>{
        setTimeout(()=>{
            history.push("/");
        },5000)
    })

    return (<div>
        <HomeNavbar/>
        <h1>Transaccion exitosa (Gracias por comprar!) o fallida. Sera redirigido al menu automaticamente...</h1>
        </div>);
}

export default ResultadoTransaccion;