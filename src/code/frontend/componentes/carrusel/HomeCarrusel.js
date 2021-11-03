import { Carousel } from 'react-bootstrap';
import ProductoService from '../../../servicios/ProductoService';
import ServicioService from '../../../servicios/ServicioService';
import { useHistory } from 'react-router';
import './HomeCarrusel.css';
function HomeCarrusel() {
    const productoMasVendido = ProductoService.getMasVendido();
    const servicioMasVendido = ServicioService.getMasVendido();
    const history = useHistory();
    return (
        <div className="home-carrusel">
            <Carousel className="carrusel">
                <Carousel.Item >
                    <div
                        className="img-carousel"
                        style={{ backgroundImage: "url(" + productoMasVendido.imagen + ")" }}
                        alt={productoMasVendido.nombre}
                    ></div>
                    <Carousel.Caption onClick={()=>history.push("producto?id="+productoMasVendido.id)} className="label">
                        <h3>{productoMasVendido.nombre}</h3>
                        <p>Nuestro producto mas vendido</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <div
                        className="img-carousel"
                        style={{ backgroundImage: "url(" + servicioMasVendido.imagen + ")" }}
                        alt={servicioMasVendido.nombre}
                    ></div>

                    <Carousel.Caption onClick={()=>history.push("servicio?id="+servicioMasVendido.id)} className="label">
                        <h3>{servicioMasVendido.nombre}</h3>
                        <p>Pruebe nuestro servicio mas valorado</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomeCarrusel;