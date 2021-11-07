import HomeNavbar from '../../componentes/navbar/HomeNavbar'
import ListaProductos from "../../componentes/producto/listaProductos/ListaProductos"
// import SampleProductos from '../../../../samples/productos.json';
// import SampleServicios from '../../../../samples/servicios.json';
import './HomePage.css';
import Banner from '../../componentes/banner/Banner';
import HomeCarrusel from '../../componentes/carrusel/HomeCarrusel';
import ListaServicios from '../../componentes/servicio/listaServicios/ListaServicios';
import ProductoService from '../../../servicios/ProductoService';
import ServicioService from '../../../servicios/ServicioService';
import { useState } from 'react';
import { useEffect } from 'react';
function HomePage() {
  const [productos, setProductos] = useState();
  const [servicios, setServicios] = useState();

  ProductoService.subscribe(()=>{
    setProductos(ProductoService.getProductos());
    setServicios(ServicioService.getServicios());
  })

  useEffect(()=>{
    setProductos(ProductoService.getProductos());
    setServicios(ServicioService.getServicios());
  },[])
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
        {productos&&<ListaProductos listaProductos={productos} />}
        <h1 className="titulo-productos-servicios">Nuestros Servicios</h1>
        {servicios && <ListaServicios lista={servicios} />}
      </div>
    </div>
  );
}

export default HomePage;