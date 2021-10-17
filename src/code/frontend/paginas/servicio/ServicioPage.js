
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import './ServicioPage.css';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import ServicioService from '../../../servicios/ServicioService';
import FormularioCompra from '../../componentes/servicio/formularioCompra/FormularioCompra';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';

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
  const servicioActual = ServicioService.getSevicioPorId(query.get("id")) ?? history.push("/404");
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    servicioActual ? <>
      <HomeNavbar />
      <div className="servicio-page">
        <div className="servicio-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${servicioActual.imagen}")` }}></div>
          <h1 className="item titulo">{servicioActual.nombre}</h1>
          <p className="item descripcion">{servicioActual.descripcion}</p>
          <div className="item precio">
            <label className="label">${servicioActual.precio}</label>
            <br /><hr />
          </div>
          <div className="item form">
            <FormularioCompra onSubmit={handleSubmit} />
          </div>
        </div>
        <div>
          <div className="item-lista-resenias">
            <br />
            <AgregarResenia />
            <h2 className="item-titulo-resenia">Reseñas del servicio</h2>
            <br />
            <ListaResenias listaResenias={servicioActual.resenias} />
          </div>
        </div>
      </div>
    </> : <></>
  );
}

export default ServicioPage;