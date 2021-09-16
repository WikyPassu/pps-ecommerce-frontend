import React from 'react';
import FormularioFactura from './formularioFactura/FormularioFactura';
import ListaProductosCarrito from './listaProductosCarrito/ListaProductosCarrito';
import MetodoPago from './metodoPago/MetodoPago';
import "./CajaPage.css";
import HomeNavbar from '../../navbar/HomeNavbar';
function Caja() {
    return (<div>
        <HomeNavbar />
        <div className="caja-container">
            <div className="item-form-factura"><FormularioFactura/></div>
            <div className="item-productos-carrito" >
                <b>Lista productos del carrito</b>
                <br/>
                <br/>
                <ListaProductosCarrito />
            </div>
            <div className="item-btn-pagar w-100"><MetodoPago /></div>
        </div>
    </div>);
}

export default Caja;