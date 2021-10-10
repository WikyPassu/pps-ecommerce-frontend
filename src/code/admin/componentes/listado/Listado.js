import { Table } from 'react-bootstrap';

function getColumnas(atributos = []) {
  return <tr key={"trCols"}>{atributos.map((c) => <th key={"th"+c}>{c}</th>)}</tr>
}

function getFilas(atributos = [], datos = [],attrKey, onClick = ()=>{}) {
  return datos.map((dato) => <tr onClick={()=>{onClick(dato);}} key={"tr"+dato[attrKey]}>
    {atributos.map((atributo) => <td key={"td"+dato[attrKey]+dato[atributo]}>{dato[atributo]}</td>)}
  </tr>)
}

export default function Listado({ columnas, atributos, datos, attrKey, onClick }) {
  return (<Table striped bordered hover>
    <thead>
      {getColumnas(columnas||atributos)}
    </thead>
    <tbody>
      {getFilas(atributos, datos,attrKey,onClick)}
    </tbody>
  </Table>)
}