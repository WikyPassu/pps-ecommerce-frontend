import { Table } from 'react-bootstrap';
export default function Productos(){
    return (<Table striped bordered hover>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>asd</td>
            <td>asd</td>
            <th>23</th>
            <td>$1300</td>
          </tr>
          <tr>
            <td>2</td>
            <td>asd</td>
            <td>asd</td>
            <th>23</th>
            <td>$1300</td>
          </tr>
        </tbody>
      </Table>)
}