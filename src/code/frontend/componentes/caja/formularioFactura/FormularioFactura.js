import React, { useEffect, useState } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping, MdMail } from 'react-icons/md';
import { useHistory } from 'react-router';
import CarritoService from '../../../../servicios/CarritoService';
import ClienteService from '../../../../servicios/ClienteService';
import './FormularioFactura.css';

const initialValuesElemento = {
    _id: new Date().getTime(),
    "total": 0,
    "usuarioRegistrado": ClienteService.getUsuario() ?? {},
    "empleado": null,
    "fecha": null,
    "detalleFactura": [],
    "estado": "preparando"
};



function FormularioFactura() {
    
    const [factura,setFactura] = useState(initialValuesElemento);
    const [envios, setEnvios] = useState(false);
    const history = useHistory();

    CarritoService.subscribe(()=>{
        console.log("HAY ENVIOS: ",CarritoService.getItems().find((c)=>c._id === "envios")?"si":"no");
        setEnvios(CarritoService.getItems().find((c)=>c._id === "envios")?"si":"no")
    })

    useEffect(()=>{
        const usuarioLogeado = ClienteService.getUsuario();
        if(usuarioLogeado == null){
            history.push("/");
        }
        else{
            setFactura((factura)=>{
                return {...factura,usuarioRegistrado:usuarioLogeado};
            })
            setEnvios(CarritoService.getItems().find((c)=>c._id === "envios")?"si":"no")
        }

    },[history])
    const handlerChange = ({target})=>{
        let {value} = target;
        if(value === "si"){
            setEnvios(value)
            CarritoService.addEnvios();
        }
        else {
            setEnvios("no")
            CarritoService.removeEnvios();
        }
    }
    return (
        <>
            <Form>
                <label className="title-factura">Caja</label><br />
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.nombre}  placeholder="Nombres" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                    <FormControl readOnly value={factura?.usuarioRegistrado?.apellido} placeholder="Apellido" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text> <BsBuilding /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.localidad} placeholder="Localidad" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsMap /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.domicilio} placeholder="Domicilio" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFilePost /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.codigoPostal} placeholder="Codigo Postal" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsPhone /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.telefono} placeholder="Numero de teléfono" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><MdMail /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado?.correo} placeholder="Correo Electrónico" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><MdLocalShipping /></InputGroup.Text>
                    <Form.Select value={envios} onChange={handlerChange}>
                        <option value="si">SI</option>
                        <option value="no">NO</option>
                    </Form.Select>
                </InputGroup>
            </Form>
        </>
    );
}
export default FormularioFactura;