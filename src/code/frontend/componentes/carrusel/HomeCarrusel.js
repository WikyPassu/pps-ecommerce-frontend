import { Carousel } from 'react-bootstrap';
import './HomeCarrusel.css';
function HomeCarrusel() {
    return (
        <div className="home-carrusel">
            <Carousel className="carrusel">
                <Carousel.Item>
                    <div
                        className="img-carousel"
                        style={{backgroundImage:"url(https://free4kwallpapers.com/uploads/originals/2020/03/27/pet-shining-wallpaper.jpg)"}}
                        alt="First slide"
                        ></div>
                    <Carousel.Caption className="label">
                        <h3>PRODUCTO X</h3>
                        <p>El producto mas vendido en CATEGORIA</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className="img-carousel"
                        style={{backgroundImage:"url(https://windows10wall.com/wp-content/uploads/2013/12/beautiful_puppy_black_background_wallpaper.jpg)"}}
                        alt="Second slide"
                    ></div>

                    <Carousel.Caption>
                        <h3>SERVICIO X</h3>
                        <p>Pruebe nuestro servicio mejor valorado en CATEGORIA</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomeCarrusel;