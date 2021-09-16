import { Table } from 'react-bootstrap';
export default function Usuarios(){
    return (<Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <td>DNI</td>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>1232132</td>
            <td>asd@mdo.com</td>
            <td>EMPLEADO</td>
            <td>asdsad</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>1232131</td>
            <td>asd@mdo.com</td>
            <td>ADMINISTRADOR</td>
            <td>asdsad</td>
          </tr>
        </tbody>
      </Table>)
}