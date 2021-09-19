import React, { useState } from 'react';
import FormularioFactura from '../../componentes/caja/formularioFactura/FormularioFactura';
import MetodoPago from '../../componentes/caja/metodoPago/MetodoPago';
import "./CajaPage.css";
import HomeNavbar from '../../componentes/navbar/HomeNavbar';
import ListaItemsCarrito from '../../componentes/carrito/listaItemsCarrito/ListaItemsCarrito';
import CarritoService from '../../../servicios/CarritoService';
function Caja() {
    const [caja,setCaja] = useState({total:CarritoService.getTotal()})
    CarritoService.subscribe(()=>{
        setCaja({total:CarritoService.getTotal()})
    })
    return (<>
        <HomeNavbar />
        <div className="caja-container-box">
            <div className="item-form-factura"><FormularioFactura /></div>
            <div className="item-productos-carrito" >
                <b>Lista productos del carrito</b>
                <br/>
                <label className="total-caja">TOTAL: ${caja.total}</label>
                <br />
                <br/>
                <ListaItemsCarrito />
            </div>
            
            <div className="item-btn-pagar w-100"><MetodoPago /></div>
        </div>
    </>);
}

export default Caja;