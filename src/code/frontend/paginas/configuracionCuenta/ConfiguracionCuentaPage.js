import React, { useEffect, useState } from 'react';
import "./ConfiguracionCuentaPage.css";
import HomeNavbar from '../../componentes/navbar/HomeNavbar';
import ClienteService from '../../../servicios/ClienteService';
import TurnoService from '../../../servicios/TurnoService';
import UtilsService from '../../../servicios/UtilsService';
import FormDatosCliente from '../../componentes/configuracionCuenta/formDatosCliente/FormDatosCliente';
import Listado from '../../componentes/listado/Listado';
import ModalTurno from '../../componentes/configuracionCuenta/modalTurno/ModalTurno';

function ConfiguracionCuentaPage() {

    const [usuario, setUsuario] = useState(null);
    //const [pagos, setPagos] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [turnoMostrar, setTurnoMostrar] = useState(null);
    const [modalTurno, setModalTurno] = useState(false);

    TurnoService.subscribe(()=>{
        if(usuario)
            setTurnos(TurnoService.getTurnosPorDni(usuario.dni))
    })

    useEffect(() => {
        UtilsService.setLoading(true);
        const obtenerDatos = async () => {
            const usuarioLogeado = ClienteService.getUsuario();
            if (usuarioLogeado) {
                setUsuario(usuarioLogeado);
                setTurnos(TurnoService.getTurnosPorDni(usuarioLogeado.dni))
            }
        }
        obtenerDatos().finally(() => {
            UtilsService.setLoading(false);
        })
    }, [])

    const handlerSubmit = async (usuarioEditado) => {
        //console.log("Usuario Editado", usuarioEditado);
        await ClienteService.modifyCliente(usuarioEditado);
        ClienteService.cerrarSesion();
        await ClienteService.login(usuarioEditado.correo, usuarioEditado.clave)
        window.location.href = "/";
    }

    return (<>
        <HomeNavbar />
        {modalTurno && <ModalTurno
            show={modalTurno}
            turno={turnoMostrar}
            onHide={() => { setModalTurno(false) }} />}
        <div className="configuracion-cuenta">
            <FormDatosCliente className="datos-cliente" datosUsuario={usuario} onSubmit={handlerSubmit} />
            <div className="lista-turnos">
                <h2>Mis Turnos</h2>
                <div className="lista">
                    <Listado
                        datos={turnos}
                        attrKey="_id"
                        atributos={["fecha", "precio", "servicio", "estado"]}
                        attrFuncs={[
                            {
                                columnaIndex: 0, attrFunc: (value) => {
                                    return UtilsService.timeStampToStringDate(value);
                                }
                            },
                            {
                                columnaIndex: 1, attrFunc: (value) => {
                                    return "$" + UtilsService.priceFormater(value);
                                }
                            },
                            {
                                columnaIndex: 2, attrFunc: (value) => {
                                    return value.nombre;
                                }
                            }
                        ]}
                        onShowClick={(e) => {
                            setTurnoMostrar(e)
                            setModalTurno(true);
                        }}
                    />
                </div>
            </div>
        </div>

    </>);
}

export default ConfiguracionCuentaPage;