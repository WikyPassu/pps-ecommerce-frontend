import React, { useEffect } from 'react';
import "./ResultadoTransaccionPage.css";
import { useHistory, useParams } from 'react-router-dom';
import HomeNavbar from '../../../componentes/navbar/HomeNavbar';
function ResultadoTransaccionPage() {
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        
        setTimeout(() => {
            history.push("/");
        }, 5000)
    })

    return (<>
            <HomeNavbar />
        <div className="resultado-transaccion">
            <div className="img">
                {params.resultado === "pendiente" || params.resultado === "exitoso" ? 
                    <label className="titulo">¡Gracias por comparar en Puppyness Pet Caring!</label>:
                    <label  className="titulo">No se pudo concretar la compra</label>
                    }
                    <br/>
                <label className="subtitulo">Será redirigido al sitio principal</label>
            </div>
        </div>

    </>);
}

export default ResultadoTransaccionPage;