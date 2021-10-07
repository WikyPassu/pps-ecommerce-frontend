
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import SampleResenias from '../../../../samples/resenias.json';
import './ProductoPage.css';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';
import { useEffect } from 'react';
import CarritoService from '../../../servicios/CarritoService';
import { useHistory, useLocation } from 'react-router';
import ProductoService from '../../../servicios/ProductoService';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
import FormularioCompra from '../../componentes/producto/formularioCompra/FormularioCompra';

/**
 * Obtiene la query de la url
 * @returns 
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductoPage(props) {
  const history = useHistory();
  const now = new Date();
  //const nowFormated = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate()}`;
  let query = useQuery();
  const productoActual = ProductoService.getProductoPorCodigo(query.get("codigo")) ?? history.push("/404");
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    CarritoService.addItem(productoActual, e.target.cantidad.value);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    productoActual ? <>
      <HomeNavbar />
      <div className="producto-page">
        <div className="producto-info-container">
          <div className="item imagen" style={{ backgroundImage: `url("${productoActual.imagen}")` }}></div>
          <h1 className="item titulo">{productoActual.nombre}</h1>
          <p className="item descripcion">{productoActual.descripcion}</p>
          <div className="item precio">
            <label className="label">${productoActual.precio}</label>
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
            <h2 className="item-titulo-resenia">Reseñas del producto</h2>
            <br />
            <ListaResenias listaResenias={SampleResenias} />
          </div>
        </div>
      </div>
    </> : <></>
  );
}

export default ProductoPage;