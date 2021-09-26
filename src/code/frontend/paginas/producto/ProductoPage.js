import { Form, Row, Col, Button } from 'react-bootstrap';
import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import SampleResenias from '../../../../samples/resenias.json';
import './ProductoPage.css';
import ListaResenias from '../../componentes/resenia/listaResenias/ListaResenias';
import { useEffect } from 'react';
import CarritoService from '../../../servicios/CarritoService';
import { useHistory, useLocation } from 'react-router';
import ProductoService from '../../../servicios/ProductoService';
import AgregarResenia from '../../componentes/resenia/agregarResenia/AgregarResenia';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductoPage(props) {
  const history = useHistory();
  const now = new Date();
  const nowFormated = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,"0")}-${now.getDate()}`;
  let query = useQuery();
  const productoActual = ProductoService.getProductoPorCodigo(query.get("codigo")) ?? history.push("/404");
  const agregarProductoAlCarrito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cantidad = e.target.cantidad.value;
    const turno = e.target.turno.value;
    console.log(turno);
    CarritoService.addItem(productoActual,cantidad);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  if (productoActual) {

    return (
      <>
        <HomeNavbar />
        <section>
          <br />
          <div className="contenedor">
            <div className="item-imagen" style={{ backgroundImage: `url("${productoActual.imagen}")` }}></div>
            <div className="item header">
              <h1 className="titulo-producto">{productoActual.nombre}</h1>
              <p className="descripcion">{productoActual.descripcion}</p>
            </div>
            <div className="item">
              <label className="precio">${productoActual.precio}</label>
              <br /><hr />
            </div>
            <div className="item cantidad">
              <Form noValidate onSubmit={agregarProductoAlCarrito}>
                <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                  <Row>
                    <Form.Label id="input-cantidad" className="label-cantidad" column sm={4}>
                      Cantidad
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control name="cantidad" max="9999" defaultValue="1" min="1" type="number" />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label className="label-fecha-turno" column sm={4}>
                      Fecha del turno
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control name="turno" min={nowFormated} defaultValue={nowFormated} type="date" />
                    </Col>
                  </Row>
                  <Row>
                    <div className="btn-agregar-carrito">
                      <Button type="submit">Agregar Carrito</Button>
                    </div>
                  </Row>
                </Form.Group>
              </Form>
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
        </section>
      </>
    );
  }
  else {
    return <></>;
  }

}

export default ProductoPage;