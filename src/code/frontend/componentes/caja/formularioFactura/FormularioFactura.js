import React from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import './FormularioFactura.css';
function FormularioFactura() {
    return (<Form>
        <label className="title-factura">Datos de la Factura</label><br />
        <InputGroup className="input-formulario">
            <InputGroup.Text>Nombre</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text>Apellido</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text>Localidad</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text>Direccion</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text>Codigo Postal</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <InputGroup className="input-formulario">
            <InputGroup.Text>Telefono</InputGroup.Text>
            <FormControl />
        </InputGroup>
        <hr />
        <div className="contenedor-envios">
            <span className="title-factura">Envios</span>
            <div className="inline">
                <InputGroup>
                    <InputGroup.Radio name="asd" checked aria-label="Radio button for following text input" />
                    <InputGroup.Text>Retiro del local</InputGroup.Text>
                    <InputGroup.Radio name="asd" aria-label="Radio button for following text input" />
                    <InputGroup.Text>Envio a Domicilio</InputGroup.Text>
                </InputGroup>
            </div>
        </div>
    </Form>);
}
export default FormularioFactura;