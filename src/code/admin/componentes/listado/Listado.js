import { Table, Button } from 'react-bootstrap';

function getColumnas(atributos = [],acciones) {
  return (
    <tr key={"trCols"}>
      {atributos.map((c) => <th key={"th" + c}>{c}</th>)}
      {(acciones)&&<th colSpan="3" style={{textAlign:"center"}}>Acciones</th>}
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
  if(columnaIndex !== undefined && attrFuncs){
    let funcList = attrFuncs.filter((c)=>c.columnaIndex === columnaIndex);
    if(funcList.length){
      return funcList[0].attrFunc(value,object);
    }
  }
  return value;
}

function getFilas(atributos = [], datos = [], attrKey, onEditClick, onDeleteClick, onShowClick,attrFuncs) {
  return datos.map((dato) => <tr key={"tr" + dato[attrKey]}>
    {atributos.map((atributo,index) => <td key={"tdAttr" + dato[attrKey] + atributo}>{changeValuesByFunc(dato[atributo],dato,index,attrFuncs)}</td>)}
    {onEditClick&&<td key={`td${dato[attrKey]}btnEditar`}><Button key={`${dato[attrKey]}btnEditar`} onClick={()=>{onEditClick(dato)}}>Editar</Button></td>}
    {onDeleteClick&&<td key={`td${dato[attrKey]}btnEliminar`}><Button key={`${dato[attrKey]}btnEliminar`} onClick={()=>{onDeleteClick(dato)}}>Eliminar</Button></td>}
    {onShowClick&&<td key={`td${dato[attrKey]}btnMostrar`}><Button key={`${dato[attrKey]}btnMostrar`} onClick={()=>{onShowClick(dato)}}>Ver</Button></td>}
  </tr>)
}

/**
 * - columnas: Nombres de las columnas que se mostraran. Deben estar en el mismo orden que los atributos asociados (opcional)
 * - atributos: Los atributos que se mostraran de cada objeto.
 * - datos: array de objetos.
 * - attrKey: El atributo que se usa como id del objeto.
 * - onEditClick: Callback de click en boton editar.
 * - onDeleteClick: Callback de click en boton eliminar.
 * - onShowClick: Callback para solo mostrar informacion
 * - attrFuncs: Es un array de nombre de atributos con su funcion. Es para los atributos que deben mostrar valores distintos a los originales. Ejemplo: [{columnaIndex:2,attrFunc:formatoFecha}]
 * @param {columna} asd
 * @returns 
 */
export default function Listado({ columnas, atributos, datos, attrKey, onEditClick, onDeleteClick,onShowClick, attrFuncs }) {
  return (<Table striped bordered hover>
    <thead>
      {getColumnas(columnas || atributos,(onDeleteClick||onEditClick||onShowClick))}
    </thead>
    <tbody>
      {getFilas(atributos, datos, attrKey, onEditClick,onDeleteClick,onShowClick,attrFuncs)}
    </tbody>
  </Table>)
}