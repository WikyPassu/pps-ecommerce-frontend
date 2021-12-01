import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './puppyness-theme.css';
import HomePage from './code/frontend/paginas/home/HomePage';
import ProductoPage from './code/frontend/paginas/producto/ProductoPage';
import LoginAdminPage from "./code/admin/paginas/loginAdmin/LoginAdminPage";
import AdminHomePage from "./code/admin/paginas/home/AdminHomePage";
import CajaPage from "./code/frontend/paginas/caja/CajaPage";
import ResultadoTransaccionPage from "./code/frontend/paginas/caja/resultadoTransaccion/ResultadoTransaccionPage";

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
import CarritoService from "./code/servicios/CarritoService";

import Loading from "./code/frontend/componentes/loading/Loading";
import { useEffect } from "react";
import ResultadoTurnoPage from "./code/frontend/paginas/servicio/resultadoTurno/ResultadoTurnoPage";
import EnviosService from "./code/servicios/EnviosService";
import ResultadoTransaccionAdminPage from "./code/admin/paginas/resultadoTransaccion/ResultadoTransaccionAdminPage";
import ConfiguracionCuentaPage from "./code/frontend/paginas/configuracionCuenta/ConfiguracionCuentaPage";

function App() {
  useEffect(() => {
    ProductoService.iniciarServicio();
    ServicioService.iniciarServicio();
    FacturasService.iniciarServicio();
    ClienteService.iniciarServicio();
    EmpleadoService.iniciarServicio();
    ConsumibleService.iniciarServicio();
    EnviosService.iniciarServicio();
    TurnoService.iniciarServicio();
    CarritoService.iniciarServicio();
  }, [])

  return (
    <div className="App">
      <Loading />
      <Router>
        <Switch>
          <Route path="/" exact><Redirect to="/home" /></Route>
          <Route exact path="/home" component={HomePage}></Route>
          <Route path="/busqueda" component={BusquedaPage}></Route>
          <Route path="/producto" component={ProductoPage} />
          <Route path="/configuracionCuenta" component={ConfiguracionCuentaPage}></Route>
          <Route exact path="/servicio" component={ServicioPage} />
          <Route exact path="/servicio/resultado/:resultado" component={ResultadoTurnoPage}></Route>
          <Route exact path="/caja" component={CajaPage}></Route>
          <Route exact path="/caja/resultado/:resultado" component={ResultadoTransaccionPage}></Route>
          <Route path="/admin/login" component={LoginAdminPage}></Route>
          <Route path="/admin/home" component={AdminHomePage}></Route>
          <Route path="/admin/resultadoTransaccion/:resultado" component={ResultadoTransaccionAdminPage}></Route>
          <Route exact path="/admin"><Redirect to="/admin/login" /></Route>
          <Route path="*" exact="true" component={NotFoundPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
