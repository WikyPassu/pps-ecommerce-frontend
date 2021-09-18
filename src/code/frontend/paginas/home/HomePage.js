import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import ListaProductos from "../../componentes/producto/listaProductos/ListaProductos"
import SampleProductos from '../../../../samples/productos.json';
import Carousel from '../../componentes/carrusel/HomeCarrusel';
import './HomePage.css';
function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Carousel />
      <br />
      <br />
      <h1 className="titulo-productos-servicios">Nuestros productos</h1>
      <ListaProductos listaProductos={SampleProductos} />
      <h1 className="titulo-productos-servicios">Nuestros Servicios</h1>
      <ListaProductos listaProductos={SampleProductos} />
    </>
  );
}

export default HomePage;