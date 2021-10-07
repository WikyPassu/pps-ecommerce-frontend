import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ProductoService from '../../../../servicios/ProductoService';
import FormProductoModal from './agregarProducto/FormProductoModal';
export default function Productos() {
  const [state, setState] = useState({
    lista: ProductoService.getProductos(),
    mostrarModalModificar: false,
    productoModificar: undefined
  })
  ProductoService.subscribe((nuevaLista) => {
    setState({ lista: nuevaLista, mostrarModalModificar: false, productoModificar: undefined });
  });
  return (<><Table striped bordered hover>
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Categoria</th>
        <th>Descripcion</th>
        <th>Stock Existente</th>
        <th>Stock Minimo</th>
        <th>Stock Maximo</th>
        <th>Precio</th>
      </tr>
    </thead>

    <tbody>
      {state.lista.map((p) => {
        const { codigo, nombre, categoria, descripcion, stock, precio } = p;
        return <tr key={codigo} onClick={() => { setState({ ...state, mostrarModalModificar: true, productoModificar: p }) }}>
          <td>{codigo}</td>
          <td>{nombre}</td>
          <td>{categoria}</td>
          <td>{descripcion}</td>
          <td>{stock.existencia}</td>
          <td>{stock.minimo}</td>
          <td>{stock.maximo}</td>
          <td>${precio}</td>
        </tr>
      })}

    </tbody>
  </Table>
    {state.mostrarModalModificar&&<FormProductoModal
      produtoParaModificar={state.productoModificar}
      show={state.mostrarModalModificar}
      onHide={() => { setState({ ...state, mostrarModalModificar: false,lista:ProductoService.getProductos() }) }} />}

  </>)
}