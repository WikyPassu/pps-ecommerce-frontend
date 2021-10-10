import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import ListaProductos from "../../componentes/producto/listaProductos/ListaProductos"
import SampleProductos from '../../../../samples/productos.json';
import SampleServicios from '../../../../samples/servicios.json';
import './HomePage.css';
import Banner from '../../componentes/banner/Banner';
import HomeCarrusel from '../../componentes/carrusel/HomeCarrusel';
import ListaServicios from '../../componentes/servicio/listaProductos/ListaServicios';
function HomePage() {
  return (
    <div className="home-page">
      <HomeNavbar />
      <Banner />
      <br />
      <br />
      <div className="hompage-body">
        <HomeCarrusel />
        <br />
        <h1 className="titulo-productos-servicios">Nuestros productos</h1>
        <ListaProductos listaProductos={SampleProductos} />
        <h1 className="titulo-productos-servicios">Nuestros Servicios</h1>
        <ListaServicios lista={SampleServicios} />
      </div>
    </div>
  );
}

export default HomePage;