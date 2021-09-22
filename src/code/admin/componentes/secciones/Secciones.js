import { Tab, Button, Tabs } from 'react-bootstrap';
import Clientes from './clientes/Clientes';
import Productos from './productos/Productos';
import AgregarProductoModal from './productos/agregarProducto/AgregarProductoModal';
import Servicios from './servicios/Servicios';
import Ventas from './ventas/Ventas';
import Turnos from './turnos/Turnos'
import Usuarios from './usuarios/Usuarios'
import './Secciones.css';
import { useState } from 'react';
import Frontend from './frontend/Frontend';
export default function Secciones() {
  const [modalShowProducto, setModalShowProducto] = useState(false);
  return (
    <Tabs defaultActiveKey="ventas" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="ventas" title="Ventas">
        <div className="tab-container">
          <label className="titulo-seccion">Ventas Realizadas</label>
          <span><Button className="btn-agregar">Agregar venta</Button></span>
          <Ventas />
        </div>
      </Tab>
      <Tab eventKey="productos" title="Productos">
        <div className="tab-container">
          <label className="titulo-seccion">Productos ofrecidos</label>
          <Button className="btn-agregar" onClick={() => setModalShowProducto(true)}>Agregar Producto</Button>
          <span><AgregarProductoModal show={modalShowProducto} onHide={() => setModalShowProducto(false)} /></span>
          <Productos  />
        </div>
      </Tab>
      <Tab eventKey="servicios" title="Servicios">
        <div className="tab-container">
          <label className="titulo-seccion">Servicios prestados</label>
          <span><Button className="btn-agregar">Agregar Servicio</Button></span>
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
          <label className="titulo-seccion">Clientes registrados</label>
          <span><Button className="btn-agregar">Registrar Cliente</Button></span>
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
      <Tab eventKey="frontend" title="Frontend">
        <div className="tab-container">
          <Frontend />
        </div>
      </Tab>
    </Tabs>
  )

}