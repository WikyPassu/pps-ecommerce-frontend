import { Tab, Button, Tabs } from 'react-bootstrap';
import Clientes from './clientes/Clientes';
import Productos from './productos/Productos';
import Servicios from './servicios/Servicios';
import Ventas from './ventas/Ventas';
import Turnos from './turnos/Turnos'
import Usuarios from './usuarios/Usuarios'
import './Secciones.css';
export default function Secciones() {

  return (
    <Tabs defaultActiveKey="ventas">
      <Tab eventKey="ventas" title="Ventas">
        <div className="tab-container">
          <Ventas />
        </div>
      </Tab>
      <Tab eventKey="productos" title="Productos">
        <div className="tab-container">
          <Productos />
        </div>
      </Tab>
      <Tab eventKey="servicios" title="Servicios">
        <div className="tab-container">
          <Servicios />
        </div>
      </Tab>
      <Tab eventKey="turnos" title="Turnos">
        <div className="tab-container">
          <label className="titulo-seccion">Turnos</label>
          <span><Button className="btn-agregar">Agregar Turno</Button></span>
          <Turnos />
        </div>
      </Tab>
      <Tab eventKey="clientes" title="Clientes">
        <div className="tab-container">
          <Clientes />
        </div>
      </Tab>
      <Tab eventKey="usuarios" title="Usuarios">
        <div className="tab-container">
          <label className="titulo-seccion">Usuarios</label>
          <span><Button className="btn-agregar">Agregar Usuario</Button></span>
          <Usuarios />
        </div>
      </Tab>
    </Tabs>
  )

}