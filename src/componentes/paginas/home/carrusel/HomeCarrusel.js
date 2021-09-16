import { Carousel } from 'react-bootstrap';
import './HomeCarrusel.css';
function HomeCarrusel() {
    return (
        <Carousel>
            <Carousel.Item>
                <div
                    className="img-carousel"
                    style={{backgroundImage:"url(https://free4kwallpapers.com/uploads/originals/2020/03/27/pet-shining-wallpaper.jpg)"}}
                    alt="First slide"
                    ></div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div
                    className="img-carousel"
                    style={{backgroundImage:"url(https://windows10wall.com/wp-content/uploads/2013/12/beautiful_puppy_black_background_wallpaper.jpg)"}}
                    alt="Second slide"
                ></div>

                <Carousel.Caption>
                    <h3>Pet-Shop Boys...</h3>
                    <p>Always on my mind... buen tema</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCarrusel;