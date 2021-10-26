import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './puppyness-theme.css';
import HomePage from './code/frontend/paginas/home/HomePage';
import ProductoPage from './code/frontend/paginas/producto/ProductoPage';
import LoginAdminPage from "./code/admin/paginas/loginAdmin/LoginAdminPage";
import AdminHomePage from "./code/admin/paginas/home/AdminHomePage";
import CajaPage from "./code/frontend/paginas/caja/CajaPage";
import ResultadoTransaccionPage from "./code/frontend/paginas/caja/resultadoTransaccion/ResultadoTransaccionPage";

import SampleProductos from './samples/productos.json';
import SampleFacturas from './samples/facturas.json';
import SampleServicios from './samples/servicios.json';
import SampleClientes from './samples/clientes.json';
import SampleEmpleados from './samples/empleados.json';
import SampleConsumibles from './samples/consumibles.json';
import SampleTurnos from './samples/turnos.json';


import ProductoService from "./code/servicios/ProductoService";
import NotFoundPage from "./code/frontend/paginas/notFound/NotFoundPage";
import BusquedaPage from "./code/frontend/paginas/busqueda/BusquedaPage";
import ServicioService from "./code/servicios/ServicioService";
import ServicioPage from "./code/frontend/paginas/servicio/ServicioPage";
import FacturasService from "./code/servicios/VentasService";
import ClienteService from "./code/servicios/ClienteService";
import EmpleadoService from "./code/servicios/EmpleadoService";
import ConsumibleService from "./code/servicios/ConsumibleService";
import TurnoService from "./code/servicios/TurnoService";


function App() {
  ProductoService.productos = SampleProductos;
  ServicioService.servicios = SampleServicios;
  FacturasService.facturas = SampleFacturas;
  ClienteService.clientes = SampleClientes;
  EmpleadoService.empleados = SampleEmpleados;
  ConsumibleService.consumibles = SampleConsumibles;
  TurnoService.turnos = SampleTurnos;

  return (
    <div className="App">
      <Router>
        <Route path="/" exact><Redirect to="/home" /></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/busqueda" component={BusquedaPage}></Route>
        <Route path="/producto" component={ProductoPage} />
        <Route path="/servicio" component={ServicioPage} />
        <Route exact path="/caja" component={CajaPage}></Route>
        <Route exact path="/caja/resultado" component={ResultadoTransaccionPage}></Route>
        <Route path="/admin/login" component={LoginAdminPage}></Route>
        <Route path="/admin/home" component={AdminHomePage}></Route>
        <Route exact path="/admin"><Redirect to="/admin/login" /></Route>
        <Route exact path="/404" component={NotFoundPage}></Route>
      </Router>
    </div>
  );
}

export default App;
