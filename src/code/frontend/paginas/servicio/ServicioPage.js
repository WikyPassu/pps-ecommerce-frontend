
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
  const idServicio = ServicioService.getServicioPorId(query.get("id")) ?? history.push("/404")
  const [servicio, setServicio ] = useState(idServicio) 

  ServicioService.subscribe(()=>{
    setServicio(ServicioService.getServicioPorId(query.get("id")));
  })

  //useEffect(()=>{},[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }


  const validarUsuarioParaResenia = ()=>{
    // return true
    if(ClienteService.getUsuario()){
      return ClienteService.isDisponibleParaResenia(ClienteService.getUsuario(),servicio.id);
    }
    return false;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    servicio ? <>
      <HomeNavbar />
      <div className="servicio-page">
        <div className="servicio-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${servicio.imagen}")` }}></div>
          <h1 className="item titulo">{servicio.nombre}</h1>
          <p className="item descripcion">{servicio.descripcion}</p>
          <div className="item precio">
            {/* <label className="label">${servicio.precio}</label> */}
            <br /><hr />
          </div>
          <div className="item form">
            <FormularioCompra onSubmit={handleSubmit} />
          </div>
        </div>
        <div>
          <div className="item-lista-resenias">
            <br />
            { validarUsuarioParaResenia() ? <AgregarResenia idServicio={servicio.id}/>: ""}
            <h2 className="item-titulo-resenia">Reseñas del servicio</h2>
            <br />
            <ListaResenias listaResenias={ServicioService.getResenias(servicio.id)} />
          </div>
        </div>
      </div>
    </> : <></>
  );
}

export default ServicioPage;