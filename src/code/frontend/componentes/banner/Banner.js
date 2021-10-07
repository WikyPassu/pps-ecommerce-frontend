import './Banner.css';
import { BsSearch } from "react-icons/bs";
import bannerImg from '../../../../assets/home_banner.webp';
//import bannerImg from '../../../../assets/home_banner.png';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router';


export default function Banner() {
    const history = useHistory();
    const buscar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.busqueda.value);
        history.push("./busqueda?q=" + e.target.busqueda.value);
    }
    return <div
        className="banner-container"
        style={{ backgroundImage: `url(${bannerImg})` }}>
        {/* <h1 className="banner-titulo">Productos y servicios para perros</h1> */}
        <br />
        <div>
            <Form noValidate onSubmit={buscar}>
                <InputGroup className="banner-search">
                    <InputGroup.Text className="banner-input-search-label"><BsSearch /></InputGroup.Text>
                    <FormControl
                        className="banner-search-input"
                        placeholder="Buscar producto o servicio..."
                        name="busqueda"
                        maxLength="30"
                    />
                    <Button type="submit" className="banner-input-search-button">Buscar</Button>
                </InputGroup>
            </Form>
        </div>

    </div>
}