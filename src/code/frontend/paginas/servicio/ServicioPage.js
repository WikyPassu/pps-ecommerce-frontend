
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import './ServicioPage.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ServicioService from '../../../servicios/ServicioService';
import FormularioTurno from '../../componentes/servicio/formularioTurno/FormularioTurno';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';
import ClienteService from '../../../servicios/ClienteService';
import UtilsService from '../../../servicios/UtilsService';
import TurnoService from '../../../servicios/TurnoService';


/**
 * Obtiene la query de la url
 * @returns 
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ServicioPage() {
  const history = useHistory();
  const query = useQuery();
  const [servicio, setServicio] = useState();
  const [permitirReseñar, setPermitirReseñar] = useState(false);
  const [precio, setPrecio] = useState(0);
  
  // const validarUsuarioParaResenia = async (serv) => {
  //   if (serv) {
  //     const usuarioLogeado = ClienteService.getUsuario();
  //     if (usuarioLogeado) {
  //       if (servicio) {
  //         let resultado = await ClienteService.isDisponibleParaResenia(usuarioLogeado.dni, servicio._id);
  //         console.log("Resultado verificacion de resenias; ",resultado);
  //         setPermitirReseñar(() => {
  //           return resultado;
  //         });
  //       }
  //     }
  //   }
  // }

  // ServicioService.subscribe(() => {
  //   const servicioEncontrado = ServicioService.getServicioPorId(query.get("id"));
  //   console.log("servicio encontrado (subs)",servicioEncontrado)
  //   if(servicioEncontrado){
  //     validarUsuarioParaResenia(servicioEncontrado);
  //     setServicio(() => {
  //       return servicioEncontrado;
  //     });
  //   }
  //   else{
  //     history.push("/404");
  //   }
  // })

  useEffect(() => {
    const buscarServicio = async ()=>{
      if (!ServicioService.getServicios().length) {
        await ServicioService.iniciarServicio()
      }
      const servicioEncontrado = ServicioService.getServicioPorId(query.get("id"));
      const usuarioLogeado = ClienteService.getUsuario();
      if (servicioEncontrado) {
        if(usuarioLogeado){
          let resultado = await ClienteService.isDisponibleParaResenia(usuarioLogeado.dni, servicioEncontrado._id);
          console.log("Resultado verificacion de resenias; ",resultado);
          setPermitirReseñar(() => {
            return resultado;
          });
        }
        setServicio(() => {
          return servicioEncontrado;
        })
      }
      else {
        history.push("/404")
      }
    }
    buscarServicio();
    window.scrollTo(0, 0);
  }, [history,query])


  const handlerSubmit = (e) => {
    UtilsService.setLoading(true);
    TurnoService.addTurno(e).finally(() => {
      UtilsService.setLoading(false);
      history.push("/servicio/resultado/exitoso");
    })
  }

  const handlerChange = e => {
    setPrecio(e.precio?.toFixed(2));
  }

  const handlerSubmitResenia = async (resenia) => {
    resenia.usuario = ClienteService.getUsuario();
    await ServicioService.addResenia(resenia, servicio._id);
    setTimeout(()=>{
      window.location.reload();
    },1000)
  }

  return (
    servicio ? <>
      <HomeNavbar />
      <div className="servicio-page">
        <div className="servicio-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${servicio.imagen}")` }}></div>
          <h1 className="item titulo">{UtilsService.stringFormatter(servicio.nombre, 50)}</h1>
          <p className="item descripcion">{UtilsService.stringFormatter(servicio.descripcion, 300)}</p>
          <div className="item precio">
            {precio ? "$" + precio : ""}
            <br /><hr />
          </div>
          <div className="item form">
            {ClienteService.getUsuario() ? <FormularioTurno servicio={servicio} onSubmit={handlerSubmit} onChange={handlerChange} /> : <p style={{ color: "red" }}>Deberá iniciar sesión o registrarse para poder pedir un turno de este servicio</p>}
          </div>
        </div>
        <div>
          <div className="item-lista-resenias">
            <br />
            {permitirReseñar ? <AgregarResenia onSubmit={handlerSubmitResenia} idServicio={servicio._id} /> : ""}
            <h2 className="item-titulo-resenia">Reseñas del servicio</h2>
            <br />
            <ListaResenias listaResenias={servicio.resenias} />
          </div>
        </div>
      </div>
    </> : <></>
  );
}

export default ServicioPage;