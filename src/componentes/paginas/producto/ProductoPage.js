import HomeNavbar from '../../navbar/HomeNavbar'
import SampleResenias from '../../../samples/resenias.json';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './ProductoPage.css';
import ListaResenias from '../../listaResenias/ListaResenias';
import { useEffect } from 'react';
import CarritoService from '../../servicios/CarritoService';
import { useLocation } from 'react-router';
import ProductoService from '../../servicios/ProductoService';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function ProductoPage(props) {
  let query = useQuery();
  const productoActual = ProductoService.getProductoPorCodigo(query.get("codigo"))
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  const agregarProductoAlCarrito = ()=>{
    CarritoService.addItem(productoActual);
  }
  return (
    <div>
      <HomeNavbar />
      <section>
        <br />
        <div className="contenedor">
          <div className="item-imagen"></div>
          <div className="item header">
            <h1 className="titulo">{productoActual.nombre}</h1>
            <p className="descripcion">{productoActual.descripcion}</p>
          </div>
          <div className="item">
            <label class="precio">${productoActual.precio}</label>
            <br /><hr />
          </div>
          <div className="item cantidad">
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className="label-cantidad" column sm={2}>
                Cantidad
              </Form.Label>
              <Col sm={3}>
                <Form.Control max="9999" defaultValue="1" min="1" type="number" />
              </Col>
              <Col>
                <div className="btn-agregar-carrito">
                  <Button onClick={agregarProductoAlCarrito}>Agregar Carrito</Button>
                </div>
              </Col>
            </Form.Group>
          </div>

        </div>
        <br />
        <br />
        <br />
        <div>
          <div className="item-lista-resenias">
            <h2 className="item-titulo-resenia">Reseñas del producto</h2>
            <br />
            <ListaResenias listaResenias={SampleResenias} />
          </div>

        </div>
      </section>
    </div>
  );
}

export default ProductoPage;