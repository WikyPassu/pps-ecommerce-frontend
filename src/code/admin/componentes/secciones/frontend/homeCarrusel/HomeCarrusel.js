import FrontendConfigService from "../../../../../servicios/ConfiguracionFrontendService"
import { InputGroup, Form, Button } from 'react-bootstrap';
import './HomeCarrusel.css';
import { useState, useEffect } from "react";

function EditoContenidoCarrusel(props) {

    return <>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>URL Imagen de Fondo</Form.Label>
                <Form.Control onChange={props.onChangeImagen} rows={3} />
                <br/>
                <Form.Label>Contenido Carrusel</Form.Label>
                <Form.Control onChange={props.onKeyPress} as="textarea" rows={3} />
            </Form.Group>
        </Form>
        </>
}

export default function HomeCarrusel() {
    let imagenesCarrusel = FrontendConfigService.getImagenesCarrusel();
    const [contenidoCarrusel,setContenidoCarrusel] = useState({
        html:""
    });
    const [styleCarrusel, setStyleCarrusel] = useState({
        imagen:{backgroundImage:""}
    })
    
    useEffect(() => {
        document.querySelector(".carrusel-vista-previa").innerHTML = contenidoCarrusel.html;
    })
    const onKeyPressEditor = (e)=>{
        setContenidoCarrusel({html:e.target.value});
    }

    const onChangeImagenEditor = (e)=>{
        setStyleCarrusel({imagen:{backgroundImage:`url(${e.target.value})`}});
    }

    const guardarCarrusel = ()=>{
        console.log(contenidoCarrusel,styleCarrusel);
    }

    return (<>
        <h1>Carrusel Home</h1>
        <EditoContenidoCarrusel onKeyPress={onKeyPressEditor} onChangeImagen={onChangeImagenEditor} />
        <Form.Label>Vista previa</Form.Label>
        <div style={styleCarrusel.imagen} className="carrusel-vista-previa"></div>
        <br/>
        <Button onClick={guardarCarrusel} style={{float:"right"}}>Guardar</Button>
    </>)
}