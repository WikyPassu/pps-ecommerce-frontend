import { Table, Button } from 'react-bootstrap';

function getColumnas(atributos = [],onDeleteClick) {
  return (
    <tr key={"trCols"}>
      {atributos.map((c) => <th key={"th" + c}>{c}</th>)}
      {onDeleteClick&&<th>Acciones</th>}
    </tr>
  )
}

function getFilas(atributos = [], datos = [], attrKey, onElementClick = () => { }, onDeleteClick) {
  return datos.map((dato) => <tr onClick={() => { onElementClick(dato); }} key={"tr" + dato[attrKey]}>
    {atributos.map((atributo) => <td key={"tdAttr" + dato[attrKey] + atributo}>{dato[atributo]}</td>)}
    {onDeleteClick&&<td key={`td${dato[attrKey]}btnEliminar`}><Button key={`${dato[attrKey]}btnEliminar`} onClick={()=>{onDeleteClick(dato)}}>Eliminar</Button></td>}
  </tr>)
}

/**
 * - columnas: Nombres de las columnas que se mostraran. Deben estar en el mismo orden que los atributos asociados (opcional)
 * - atributos: Los atributos que se mostraran de cada objeto.
 * - datos: array de objetos.
 * - attrKey: El atributo que se usa como id del objeto.
 * - onClick: Cuando se hace click en una fila pero no en el boton eliminar. Recibe al objeto como parametro.
 * - onDeleteClick: Cuando se hace click en el boton eliminar. El boton eliminar solo aparecera si la funcion esta definida
 * @param {columna} asd
 * @returns 
 */
export default function Listado({ columnas, atributos, datos, attrKey, onClick, onDeleteClick }) {
  return (<Table striped bordered hover>
    <thead>
      {getColumnas(columnas || atributos,onDeleteClick)}
    </thead>
    <tbody>
      {getFilas(atributos, datos, attrKey, onClick,onDeleteClick)}
    </tbody>
  </Table>)
}