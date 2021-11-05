import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import Loading from "./code/frontend/componentes/loading/Loading";

function App() {
  ProductoService.iniciarServicio();
  ServicioService.iniciarServicio();
  FacturasService.iniciarServicio();
  ClienteService.iniciarServicio();
  EmpleadoService.iniciarServicio();
  ConsumibleService.iniciarServicio();
  TurnoService.iniciarServicio();

  return (
    <div className="App">
      <Loading/>
      <Router>
        <Route path="/" exact><Redirect to="/home" /></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/busqueda" component={BusquedaPage}></Route>
        <Route path="/producto" component={ProductoPage} />
        <Route path="/servicio" component={ServicioPage} />
        <Route exact path="/caja" component={CajaPage}></Route>
        <Route exact path="/caja/resultado/:resultado" component={ResultadoTransaccionPage}></Route>
        <Route path="/admin/login" component={LoginAdminPage}></Route>
        <Route path="/admin/home" component={AdminHomePage}></Route>
        <Route exact path="/admin"><Redirect to="/admin/login" /></Route>
        <Route exact path="/404" component={NotFoundPage}></Route>
      </Router>
    </div>
  );
}

export default App;
