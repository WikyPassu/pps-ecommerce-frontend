import React, { useState } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping, MdMail } from 'react-icons/md';
import CarritoService from '../../../../servicios/CarritoService';
import ClienteService from '../../../../servicios/ClienteService';
import './FormularioFactura.css';

const initialValuesElemento = {
    id: new Date().getTime(),
    "total": 0,
    "usuarioRegistrado": ClienteService.getUsuario(),
    "empleado": null,
    "fecha": null,
    "detalleFactura": [],
    "estado": "preparando"
};

function FormularioFactura() {
    
    const [factura] = useState(initialValuesElemento); //useState(ClienteService.getUsuario());

    const handlerChange = ({target})=>{
        let {value} = target;
        if(value === "a_domicilio"){
            CarritoService.addEnvios(500);
        }
        else{
            CarritoService.removeEnvios();
        }
    }
    return (
        <>
            <Form>
                <label className="title-factura">Caja</label><br />
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.nombre}  placeholder="Nombres" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.apellido} placeholder="Apellido" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text> <BsBuilding /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.localidad} placeholder="Localidad" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsMap /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.domicilio} placeholder="Domicilio" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsFilePost /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.codigoPostal} placeholder="Codigo Postal" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><BsPhone /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.telefono} placeholder="Numero de teléfono" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><MdMail /></InputGroup.Text>
                    <FormControl readOnly value={factura.usuarioRegistrado.correo} placeholder="Correo Electrónico" />
                </InputGroup>
                <InputGroup className="input-formulario">
                    <InputGroup.Text><MdLocalShipping /></InputGroup.Text>
                    <Form.Select onChange={handlerChange}>
                        <option>¿Quiere envío a domicilio?</option>
                        <option value="a_domicilio">SI</option>
                        <option value="retiro_local">NO</option>
                    </Form.Select>
                </InputGroup>
            </Form>
        </>
    );
}
export default FormularioFactura;