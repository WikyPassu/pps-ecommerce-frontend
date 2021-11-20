import React, { useEffect, useState } from 'react';
import './FormFacturaDetallesModal.css';
import { Modal } from 'react-bootstrap';
import Listado from '../../../listado/Listado';

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
        payer,
        payment_type_id,
        status,
        status_detail
    } = elemento;
    useEffect(() => {
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