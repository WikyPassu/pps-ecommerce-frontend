import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import ListaProductos from "../../componentes/producto/listaProductos/ListaProductos"
import SampleProductos from '../../../../samples/productos.json';
import './HomePage.css';
import Banner from '../../componentes/banner/Banner';
import HomeCarrusel from '../../componentes/carrusel/HomeCarrusel';
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
      </div>
    </div>
  );
}

export default HomePage;