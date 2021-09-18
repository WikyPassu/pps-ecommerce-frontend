import { Table } from 'react-bootstrap';
export default function Turnos(){
    return (<Table striped bordered hover>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12/12/12</td>
            <td>Otto</td>
            <td>asd</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>asd</td>
          </tr>
        </tbody>
      </Table>)
}