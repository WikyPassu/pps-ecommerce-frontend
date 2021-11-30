import React from 'react'
import { Modal } from 'react-bootstrap'
import UtilsService from '../../../../servicios/UtilsService'
import Listado from '../../listado/Listado'

const ModalPago = ({ pago, onHide, show }) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            className="form-turno-modal"
            centered>
            <Modal.Header closeButton>
                <Modal.Title className="titulo">
                    Detalles del Pago
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h2>Datos del Pago</h2>
                    <li>Fecha del Pago: {UtilsService.timeStampToStringDate(pago.date_approved)}</li>
                    <li>Total: ${UtilsService.priceFormater(pago.transaction_amount)}</li>
                    <li>Estado: {pago.status}</li>
                    <hr />
                    <h2>Detalles</h2>
                    <Listado
                        datos={pago.additional_info.items}
                        atributos={["title","quantity","unit_price"]}
                        columnas={["titulo","cantidad","Precio Unitario"]}
                    />
                </div>
            </Modal.Body>
        </Modal>

    )
}

export default ModalPago
