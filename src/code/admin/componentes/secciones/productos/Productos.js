import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductoService from '../../../../servicios/ProductoService';
import Listado from '../../listado/Listado';
import FormProductoModal from './formProductoModal/FormProductoModal';

export default function Productos() {
  const [lista, setLista] = useState(ProductoService.getProductos());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [productoModificar, setProductoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  ProductoService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });
  return (<>
    <label className="titulo-seccion">Productos ofrecidos</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Producto</Button>
    {modalForm && <FormProductoModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado atributos={[
      "id",
      "nombre",
      "categoria",
      "descripcion",
      "existencia",
      "existenciaMinima",
      "existenciaMaxima",
      "precio"
    ]}
      onClick={(e) => {
        setMostrarModalModificar(true);
        setProductoModificar(e);
      }}
      attrKey="id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormProductoModal
      produtoParaModificar={productoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(ProductoService.getProductos());
      }} />}

  </>)
}