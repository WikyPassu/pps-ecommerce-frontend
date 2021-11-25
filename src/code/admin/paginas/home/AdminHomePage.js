import React, { useEffect } from 'react';
import ClienteService from '../../../servicios/ClienteService';
import ConsumibleService from '../../../servicios/ConsumibleService';
import EmpleadoService from '../../../servicios/EmpleadoService';
import EnviosService from '../../../servicios/EnviosService';
import ProductoService from '../../../servicios/ProductoService';
import ServicioService from '../../../servicios/ServicioService';
import TurnoService from '../../../servicios/TurnoService';
import FacturasService from '../../../servicios/VentasService';
import AdminNavbar from '../../componentes/navbar/AdminNavbar';
import Secciones from '../../componentes/secciones/Secciones';
export default function AdminHomePage(){
    useEffect(()=>{
        const interval = setInterval(()=>{
            ProductoService.iniciarServicio();
            ServicioService.iniciarServicio();
            FacturasService.iniciarServicio();
            ClienteService.iniciarServicio();
            EmpleadoService.iniciarServicio();
            ConsumibleService.iniciarServicio();
            EnviosService.iniciarServicio();
            TurnoService.iniciarServicio();
        },15000);
        return ()=>{
            clearInterval(interval)
        }
    })
    return (<>
        <AdminNavbar/>
        <Secciones/>
        </>);
}