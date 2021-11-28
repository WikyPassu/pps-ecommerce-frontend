import React, { useEffect } from 'react';
import "./ResultadoTransaccionAdminPage.css";
import { useHistory, useParams } from 'react-router-dom';
import AdminNavbar from '../../componentes/navbar/AdminNavbar';
function ResultadoTransaccionAdminPage() {
    const history = useHistory();
    const params = useParams();
    useEffect(() => {
        const timeOut = setTimeout(() => {
            window.location.href = "/admin/home";
         }, 5000)
        return ()=>{
            clearTimeout(timeOut)
        }
    }, [history,params.resultado])

    return (<>
        <AdminNavbar />
        <div className="resultado-transaccion">
            <div className="img">
                {params.resultado === "pendiente" || params.resultado === "exitoso" ?
                    <label className="titulo">¡Transaccion exitosa!</label> :
                    <label className="titulo">No se pudo realizar la transaccion</label>
                }
                <br />
                <label className="subtitulo">Será redirigido al sitio principal</label>
            </div>
        </div>

    </>);
}

export default ResultadoTransaccionAdminPage;