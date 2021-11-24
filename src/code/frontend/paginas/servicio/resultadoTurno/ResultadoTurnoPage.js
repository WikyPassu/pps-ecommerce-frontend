import React, { useEffect } from 'react';
import "./ResultadoTurnoPage.css";
import { useHistory, useParams } from 'react-router-dom';
import HomeNavbar from '../../../componentes/navbar/HomeNavbar';
function ResultadoTurnoPage() {
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        setTimeout(() => {
            history.push("/");
        }, 8000)
    })

    return (<>
            <HomeNavbar />
        <div className="resultado-transaccion">
            <div className="img">
                {params.resultado === "pendiente" || params.resultado === "exitoso" ? 
                    <label className="titulo">¡Tu turno ha sido programado exitosamente!</label>:
                    <label  className="titulo">No se pudo programar el turno</label>
                    }
                    <br/>
                <label className="subtitulo">Será redirigido al sitio principal</label>
            </div>
        </div>

    </>);
}

export default ResultadoTurnoPage;