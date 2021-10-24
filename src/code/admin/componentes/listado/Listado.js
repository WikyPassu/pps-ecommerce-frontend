import { Table, Button } from 'react-bootstrap';

function getColumnas(atributos = [],acciones) {
  return (
    <tr key={"trCols"}>
      {atributos.map((c) => <th key={"th" + c}>{c}</th>)}
      {(acciones)&&<th colSpan="2" style={{textAlign:"center"}}>Acciones</th>}
    </tr>
  )
}

/**
 * 
 * @param {*} value Valor a procesar
 * @param {*} object Es el objeto entero. Con todos los valores.
 * @param {*} columnaIndex Indice de la columna a afectar
 * @param {*} attrFuncs Lista de funciones para atributos
 * @returns Se devuelve el valor procesado. Si no se encontro ninguna funcion, se devolvera valor tal como ingresó.
 */
function changeValuesByFunc(value,object,columnaIndex,attrFuncs){
  if(columnaIndex != undefined && attrFuncs){
    let funcList = attrFuncs.filter((c)=>c.columnaIndex == columnaIndex);
    if(funcList.length){
      return funcList[0].attrFunc(value,object);
    }
  }
  return value;
}

function getFilas(atributos = [], datos = [], attrKey, onEditClick, onDeleteClick,attrFuncs) {
  return datos.map((dato) => <tr key={"tr" + dato[attrKey]}>
    {atributos.map((atributo,index) => <td key={"tdAttr" + dato[attrKey] + atributo}>{changeValuesByFunc(dato[atributo],dato,index,attrFuncs)}</td>)}
    {onEditClick&&<td key={`td${dato[attrKey]}btnEditar`}><Button key={`${dato[attrKey]}btnEditar`} onClick={()=>{onEditClick(dato)}}>Editar</Button></td>}
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
 * - attrFuncs: Es un array de nombre de atributos con su funcion. Es para los atributos que deben mostrar valores distintos a los originales. Ejemplo: [{columnaIndex:2,attrFunc:formatoFecha}]
 * @param {columna} asd
 * @returns 
 */
export default function Listado({ columnas, atributos, datos, attrKey, onEditClick, onDeleteClick, attrFuncs }) {
  return (<Table striped bordered hover>
    <thead>
      {getColumnas(columnas || atributos,(onDeleteClick||onEditClick))}
    </thead>
    <tbody>
      {getFilas(atributos, datos, attrKey, onEditClick,onDeleteClick,attrFuncs)}
    </tbody>
  </Table>)
}