import React, { useEffect } from 'react';
import "./ResultadoTransaccionPage.css";
import { useHistory } from 'react-router-dom';
import HomeNavbar from '../../../navbar/HomeNavbar';
function ResultadoTransaccionPage() {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            history.push("/");
        }, 5000)
    })

    return (<>
        <HomeNavbar />
        <h1>Transaccion exitosa (Gracias por comprar!) o fallida. Sera redirigido al menu automaticamente...</h1>
    </>);
}

export default ResultadoTransaccionPage;