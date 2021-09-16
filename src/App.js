import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './puppyness-theme.css';
import HomePage from './componentes/paginas/home/HomePage';
import ProductoPage from './componentes/paginas/producto/ProductoPage';
import AdminDashboardPage from "./componentes/paginas/admin/AdminDashboard/AdminDashboardPage";
import LoginAdminPage from "./componentes/paginas/admin/LoginAdmin/LoginAdminPage";
import CajaPage from "./componentes/paginas/caja/CajaPage";
import ResultadoTransaccionPage from "./componentes/paginas/caja/resultadoTransaccion/ResultadoTransaccionPage";
import SampleProductos from './samples/productos.json';
import ProductoService from "./componentes/servicios/ProductoService";

function App() {
  ProductoService.productos = SampleProductos;
  return (
    <div className="App">
      <Router>
        <Route path="/" exact><Redirect to="/home" /></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/producto" component={ProductoPage} />
        <Route path="/caja" component={CajaPage}></Route>
        <Route path="/resultado-transaccion" component={ResultadoTransaccionPage}></Route>
        <Route path="/admin/login" component={LoginAdminPage}></Route>
        <Route path="/admin/dashboard" component={AdminDashboardPage}></Route>
        <Route exact path="/admin"><Redirect to="/admin/login" /></Route>
      </Router>
    </div>
  );
}

export default App;
