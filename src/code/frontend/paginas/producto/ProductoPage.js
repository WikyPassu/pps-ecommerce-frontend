
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import './ProductoPage.css';
import { useEffect } from 'react';
import CarritoService from '../../../servicios/CarritoService';
import { useHistory, useLocation } from 'react-router';
import ProductoService from '../../../servicios/ProductoService';
import FormularioCompra from '../../componentes/producto/formularioCompra/FormularioCompra';
import ClienteService from '../../../servicios/ClienteService';

/**
 * Obtiene la query de la url
 * @returns 
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductoPage(props) {
  const history = useHistory();
  let query = useQuery();
  const productoActual = ProductoService.getProductoPorId(query.get("id")) ?? history.push("/404");
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    CarritoService.addItem(productoActual, parseInt(e.target.cantidad.value) );
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
            {ClienteService.getUsuario() ? <FormularioCompra onSubmit={handleSubmit} /> : <p style={{color:"red"}}>Deberá iniciar sesión o registrarse para poder comprar un producto</p>}
          </div>
        </div>
        {/* <div>
          <div className="item-lista-resenias">
            <br />
            <AgregarResenia />
            <h2 className="item-titulo-resenia">Reseñas del producto</h2>
            <br />
            <ListaResenias listaResenias={productoActual.resenias} />
          </div>
        </div> */}
      </div>
    </> : <></>
  );
}

export default ProductoPage;