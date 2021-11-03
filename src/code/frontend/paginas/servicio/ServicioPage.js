
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import './ServicioPage.css';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ServicioService from '../../../servicios/ServicioService';
import FormularioCompra from '../../componentes/servicio/formularioCompra/FormularioCompra';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';
import ClienteService from '../../../servicios/ClienteService';

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
  console.log(query.get("id"))
  const servicioEncontrado = ServicioService.getServicioPorId(query.get("id")) ?? history.push("/404");
  const [servicio, setServicio ] = useState(servicioEncontrado);

  ServicioService.subscribe(()=>{
    const servicioActualizado = ServicioService.getServicioPorId(query.get("id"));
    setServicio((servicio)=>{
      return {...servicio,resenias:servicioActualizado.resenias};
  });
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  const handlerSubmit = (e) => {
    e.preventDefault();
  }

  const validarUsuarioParaResenia = ()=>{
    if(ClienteService.getUsuario()){
      return ClienteService.isDisponibleParaResenia(ClienteService.getUsuario(),servicio.id);
    }
    return false;
  }

  const handlerSubmitResenia = (resenia)=>{
    resenia.usuario = ClienteService.getUsuario();
    ServicioService.addResenia(resenia,servicio.id);

  }

  return (
    servicio ? <>
      <HomeNavbar />
      <div className="servicio-page">
        <div className="servicio-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${servicio.imagen}")` }}></div>
          <h1 className="item titulo">{servicio.nombre}</h1>
          <p className="item descripcion">{servicio.descripcion}</p>
          <div className="item precio">
            <br /><hr />
          </div>
          <div className="item form">
            {ClienteService.getUsuario() ? <FormularioCompra onSubmit={handlerSubmit} /> : <p style={{color:"red"}}>Deberá iniciar sesión o registrarse para poder pedir un turno de este servicio</p>}
          </div>
        </div>
        <div>
          <div className="item-lista-resenias">
            <br />
            { validarUsuarioParaResenia() ? <AgregarResenia onSubmit={handlerSubmitResenia} idServicio={servicio.id}/>: ""}
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