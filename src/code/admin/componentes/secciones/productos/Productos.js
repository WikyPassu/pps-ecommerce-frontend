import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProductoService from '../../../../servicios/ProductoService';
import UtilsService from '../../../../servicios/UtilsService';
import Listado from '../../listado/Listado';
import FormProductoModal from './formProductoModal/FormProductoModal';

export default function Productos() {
  const [lista, setLista] = useState(ProductoService.getProductos());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [productoModificar, setProductoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  ProductoService.subscribe((nuevaLista) => {
    setLista(()=>{
      return ProductoService.getProductos();
    });
  });
  return (<>
    <label className="titulo-seccion">Productos ofrecidos</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Producto</Button>
    {modalForm && <FormProductoModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
    attrFuncs={[
      {columnaIndex:3,attrFunc:(value)=>{
        return UtilsService.stringFormatter(value,50);
      }}
    ]}
    columnas={[
          "ID",
          "Nombre",
          "Categoria",
          "Descripción",
          "Existencia",
          "Minimo",
          "Maximo",
          "Estado",
          "Precio"
        ]}
    atributos={[
      "_id",
      "nombre",
      "categoria",
      "descripcion",
      "existencia",
      "existenciaMinima",
      "existenciaMaxima",
      "estado",
      "precio"
    ]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setProductoModificar(e);
      }}
      onDeleteClick={(p)=>{ProductoService.removeProducto(p._id)}}
      attrKey="_id"
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