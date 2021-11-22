import React, { useEffect, useState } from 'react';
import './FormFacturaDetallesModal.css';
import { Modal } from 'react-bootstrap';
import Listado from '../../../listado/Listado';
//import FacturasService from '../../../../../servicios/VentasService';

const initialValuesElemento = {
    amount: 0,
    currency_id: "ARS",
    date_approved: null,
    date_created: "2021-11-02T03:14:40.046-04:00",
    description: "",
    id: 0,
    items: [],
    payer: {id: '', email: '', dni: '', type: null},
    payment_type_id: "",
    status: "",
    status_detail: ""
};

export default function FormFacturaDetallesModal({ elementoParaMostrar, onHide, show }) {
    const [elemento] = useState(elementoParaMostrar || initialValuesElemento);
    const {
        amount,
        currency_id,
        date_approved,
        date_created,
        description,
        id,
        items,
        payment_type_id,
        status,
        status_detail,
        payer,
        //orderId
    } = elemento;
    //const [payerData, setPayerData] = useState({})

    // const getPayerByOrderId = async (orderId)=>{
	// 	const token = "TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
	// 	try {
	// 		const orderRes = await fetch("https://api.mercadopago.com/merchant_orders/search",{
	// 			method:"GET",
	// 			headers:{
	// 				"Authorization":"Bearer "+token,
	// 				'Content-Type': 'application/json'
	// 			}
	// 		})
	// 		//const order = await orderRes.json();
			
	// 		const preferenceRes = await fetch("https://api.mercadopago.com/checkout/preferences/",{
	// 			headers:{
	// 				"Authorization":"Bearer "+token,
	// 				'Content-Type': 'application/json'
	// 			}
	// 		})
	// 		const preference = await preferenceRes.json()
	// 		return preference.payer;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
    useEffect(() => {
        // getPayerByOrderId(orderId)
        // .then((data)=>{
        //     console.log("PAYER",data);
        // })
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detalles del pago #{id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <li><b>Total: </b>{amount}</li>
               <li><b>Fecha de Creacion: </b>{date_created}</li>
               <li><b>Fecha de Aprobacion: </b>{date_approved}</li>
               <li><b>Descripcion: </b>{description}</li>
               <li><b>Tipo de Pago: </b>{payment_type_id}</li>
               <li><b>Estado: </b>{status} ({status_detail})</li>
               <li><b>Moneda: </b>{currency_id}</li>
               <hr/>
               <h2>Datos del comprador</h2>
               <li><b>ID: </b>{payer.id}</li>
               <li><b>Correo: </b>{payer.email}</li>
               <li><b>DNI: </b>{payer.dni}</li>
               <hr/>
               <h2>Detalles</h2>
               <Listado 
               columnas={["Nombre","Cantidad","Precio"]}
               atributos={["title","quantity","price"]}
               attrKey="title"
               datos={items}
               />
            </Modal.Body>
        </Modal>
    );
}