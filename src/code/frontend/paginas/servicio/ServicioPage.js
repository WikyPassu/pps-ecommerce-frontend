
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import './ServicioPage.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ServicioService from '../../../servicios/ServicioService';
import FormularioCompra from '../../componentes/servicio/formularioCompra/FormularioCompra';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';
import ClienteService from '../../../servicios/ClienteService';
import UtilsService from '../../../servicios/UtilsService';

/**
 * Obtiene la query de la url
 * @returns 
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ServicioPage() {
  const history = useHistory();
  let query = useQuery();
  //const servicioEncontrado = ServicioService.getServicioPorId(query.get("id")) ?? history.push("/404");
  const [servicio, setServicio] = useState();

  ServicioService.subscribe(() => {
    setServicio(() => {
      console.log("servicio encontrado",ServicioService.getServicioPorId(query.get("id")))
      return ServicioService.getServicioPorId(query.get("id")) ?? history.push("/404")
    });
  })

  useEffect(() => {
    if (ServicioService.getServicios().length) {
      setServicio(() => {
        console.log("servicio encotnrado1: ",ServicioService.getServicioPorId(query.get("id")))
        return ServicioService.getServicioPorId(query.get("id")) ?? history.push("/404");
      })
    }
    window.scrollTo(0, 0);
  }, [query,history])


  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  const validarUsuarioParaResenia = () => {
    if (ClienteService.getUsuario()) {
      return ClienteService.isDisponibleParaResenia(ClienteService.getUsuario(), servicio._id);
    }
    return false;
  }

  const handlerSubmitResenia = (resenia) => {
    resenia.usuario = ClienteService.getUsuario();
    ServicioService.addResenia(resenia, servicio._id);
  }

  return (
    servicio ? <>
      <HomeNavbar />
      <div className="servicio-page">
        <div className="servicio-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${servicio.imagen}")` }}></div>
          <h1 className="item titulo">{UtilsService.stringFormatter(servicio.nombre,50)}</h1>
          <p className="item descripcion">{UtilsService.stringFormatter(servicio.descripcion,300)}</p>
          <div className="item precio">
            <br /><hr />
          </div>
          <div className="item form">
            {ClienteService.getUsuario() ? <FormularioCompra onSubmit={handlerSubmit} /> : <p style={{ color: "red" }}>Deberá iniciar sesión o registrarse para poder pedir un turno de este servicio</p>}
          </div>
        </div>
        <div>
          <div className="item-lista-resenias">
            <br />
            {validarUsuarioParaResenia() ? <AgregarResenia onSubmit={handlerSubmitResenia} idServicio={servicio._id} /> : ""}
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