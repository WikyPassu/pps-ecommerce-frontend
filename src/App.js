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
import ProductoService from "./code/servicios/ProductoService";
import NotFoundPage from "./code/frontend/paginas/notFound/NotFoundPage";

function App() {
  ProductoService.productos = SampleProductos;
  return (
    <div className="App">
      <Router>
        <Route path="/" exact><Redirect to="/home" /></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/producto" component={ProductoPage} />
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
