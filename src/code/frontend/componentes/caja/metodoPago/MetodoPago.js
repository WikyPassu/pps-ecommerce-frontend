import {Button} from 'react-bootstrap'
import React from 'react';
import CarritoService from "../../../../servicios/CarritoService";
import UtilsService from '../../../../servicios/UtilsService';
import ClienteService from '../../../../servicios/ClienteService';
//const urlPago = "http://127.0.0.1:8080/metodoPago/realizarPago";
function MetodoPago(){
    const realizarPago = () => {
        UtilsService.setLoading(true);
        fetch(UtilsService.getUrlsApi().metodoPago.realizarPago,{
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                productos:CarritoService.getItems(),
                cliente:ClienteService.getUsuario(),
                back_urls:{
                    failure: window.location.protocol+"//"+window.location.host+"/caja/resultado/fallido",
                    pending: window.location.protocol+"//"+window.location.host+"/caja/resultado/pendiente",
                    success: window.location.protocol+"//"+window.location.host+"/caja/resultado/exitoso"
                }
            })
        })
        .then(async (res)=>{
            if(res.ok){
                let jsonData = await res.json();
                window.location.href = jsonData.mercadoPago.response.init_point;
            }
            else{
                console.log(res);
            }
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
            UtilsService.setLoading(false);
        })
    }

    return (<Button size="lg" onClick={realizarPago} className="w-100" >Pagar</Button>);
}

export default MetodoPago;