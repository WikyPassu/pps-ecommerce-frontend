import React from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillPersonFill, BsMap, BsBuilding, BsFilePost, BsPhone } from 'react-icons/bs';
import { MdLocalShipping } from 'react-icons/md';

import './FormularioFactura.css';
function FormularioFactura() {
    return (<Form>
        <label className="title-factura">Datos de la Factura</label><br />
        <InputGroup className="input-formulario">
            <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
            <FormControl placeholder="Nombres" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
            <FormControl placeholder="Apellido" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text> <BsBuilding /></InputGroup.Text>
            <FormControl placeholder="Localidad" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text><BsMap /></InputGroup.Text>
            <FormControl placeholder="Direccion" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text><BsFilePost /></InputGroup.Text>
            <FormControl placeholder="Codigo Postal" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text><BsPhone /></InputGroup.Text>
            <FormControl placeholder="Numero de telefono" />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text><MdLocalShipping /></InputGroup.Text>
            <Form.Select>
                <option>Seleccione forma de envio</option>
                <option value="retiro_local">Retiro del Local</option>
                <option value="a_domicilio">A domicilio</option>
            </Form.Select>
        </InputGroup>
    </Form>);
}
export default FormularioFactura;