import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import ListaProductos from "../../componentes/producto/listaProductos/ListaProductos"
import SampleProductos from '../../../../samples/productos.json';
import './HomePage.css';
import Banner from '../../componentes/banner/Banner';
function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Banner/>
      <br />
      <br />
      <h1 className="titulo-productos-servicios">Nuestros productos</h1>
      <ListaProductos listaProductos={SampleProductos} />
      <h1 className="titulo-productos-servicios">Nuestros Servicios</h1>
      {/* <ListaProductos listaProductos={SampleProductos} /> */}
    </>
  );
}

export default HomePage;