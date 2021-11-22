import { Tab, Tabs } from 'react-bootstrap';
import Clientes from './clientes/Clientes';
import Productos from './productos/Productos';
import Servicios from './servicios/Servicios';
import Ventas from './ventas/Ventas';
import './Secciones.css';
import Empleados from './empleados/Empleados';
import Consumibles from './consumibles/Consumibles';
import Turnos from './turnos/Turnos';
// import Storefront from './storefront/Storefront';
import PrecioEnvios from './precioEnvios/PrecioEnvios';
import { useEffect, useState } from 'react';
import EmpleadoService from '../../../servicios/EmpleadoService';
export default function Secciones() {
  const [tipoUsuario,setTipoUsuario] = useState("EMPLEADO")
  useEffect(()=>{
    setTipoUsuario(EmpleadoService.getUsuario()?.tipo);
  },[])

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
          <Turnos />
        </div>
      </Tab>
      <Tab eventKey="clientes" title="Clientes">
        <div className="tab-container">
          <Clientes />
        </div>
      </Tab>
      {tipoUsuario?<Tab eventKey="empleados" title="Empleados">
        <div className="tab-container">
          <Empleados />
        </div>
      </Tab>:""}
      <Tab eventKey="consumibles" title="Consumibles">
        <div className="tab-container">
          <Consumibles/>
        </div>
      </Tab>
      <Tab eventKey="precioEnvios" title="Precios de Envío">
        <div className="tab-container">
          <PrecioEnvios/>
        </div>
      </Tab>
      {/* <Tab eventKey="storefront" title="Storefront">
        <div className="tab-container">
          <Storefront/>
        </div>
      </Tab> */}
    </Tabs>
  )

}