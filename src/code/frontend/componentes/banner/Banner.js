import './Banner.css';
import { BsSearch } from "react-icons/bs";
import bannerImg from '../../../../assets/home_banner.webp';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
export default function Banner() {
    const history = useHistory();
    const buscar = ()=>{
        history.push("./busqueda");
    }
    return <div
        className="banner-container"
        style={{ backgroundImage: `url(${bannerImg})` }}>
        <h1 className="banner-titulo">Productos y servicios para perros</h1>
        <br/>
        <div className="">
            <InputGroup className="banner-search">
                <InputGroup.Text className="banner-input-search-label"><BsSearch/></InputGroup.Text>
                <FormControl
                    className="banner-search-input"
                    placeholder="Buscar producto"
                    aria-label="Username"
                />
                <Button onClick={buscar} className="banner-input-search-button">Buscar</Button>
            </InputGroup>
        </div>

    </div>
}