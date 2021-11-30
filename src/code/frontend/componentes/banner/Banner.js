import './Banner.css';
import { BsSearch } from "react-icons/bs";
import bannerImg from '../../../../assets/home_banner.webp';
//import bannerImg from '../../../../assets/home_banner.png';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useState } from 'react';


export default function Banner() {
    const history = useHistory();
    const [busqueda,setBusqueda] = useState({
        texto:"",
        tipo:"PRODUCTO"
    });
    const handleChange = ({target}) =>{
        let {value,name} = target;
        setBusqueda((busqueda)=>{
            return {...busqueda,[name]:value};
        })
    }
    const buscar = (e) => {
        e.preventDefault();
        history.push("./busqueda?q=" + busqueda.texto +"&type="+ busqueda.tipo);
    }
    return <div
        className="banner-container"
        style={{ backgroundImage: `url(${bannerImg})` }}>
        <br />
        <div>
            <Form onSubmit={buscar}>
                <InputGroup className="banner-search">
                    <InputGroup.Text className="banner-input-search-label"><BsSearch /></InputGroup.Text>
                    <FormControl
                        className="banner-search-input"
                        placeholder="Buscar producto o servicio..."
                        name="texto"
                        maxLength="30"
                        onChange={handleChange}
                    />
                     <Form.Select style={{cursor:"pointer"}} className="banner-input-search-type" name="tipo" onChange={handleChange} value={busqueda.tipo}>
                            <option value="PRODUCTO">PRODUCTO</option>
                            <option value="SERVICIO">SERVICIO</option>
                        </Form.Select>
                    <Button type="submit" className="banner-input-search-button">Buscar</Button>
                </InputGroup>
            </Form>
        </div>

    </div>
}