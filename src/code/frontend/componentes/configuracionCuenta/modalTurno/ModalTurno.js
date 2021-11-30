import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import TurnoService from '../../../../servicios/TurnoService'
import UtilsService from '../../../../servicios/UtilsService'

const ModalTurno = ({ turno, onHide, show }) => {

    const cancelarTurno = (idTurno) => {
        if(window.confirm("La cancelacion del turno es irreversible ¿Esta seguro que desea cancelarlo?")){
            turno.estado = "CANCELADO";
            TurnoService.modifyTurno(turno);
            onHide();
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            className="form-turno-modal"
            centered>
            <Modal.Header closeButton>
                <Modal.Title className="titulo">
                    Detalles del Turnos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h2>Datos del Turno</h2>
                    <li>Fecha del Turno: {UtilsService.timeStampToStringDate(turno.fecha)}</li>
                    <li>Precio: ${UtilsService.priceFormater(turno.precio)}</li>
                    <li>Servicio: {turno.servicio.nombre}</li>
                    <li>Estado: {turno.estado}</li>
                    <hr />
                    <h2>Datos del Perro</h2>
                    <li>Nombre: {turno.perrito.nombre}</li>
                    <li>Peso: {turno.perrito.peso} gramos</li>
                    <li>Edad: {turno.perrito.edad} años</li>
                    <li>Raza: {turno.perrito.raza}</li>
                    <br/>
                    <Button onClick={cancelarTurno} disabled={turno.estado === "CANCELADO" || turno.estado === "FINALIZADO"} variant="danger">Cancelar Turno</Button>
                </div>
            </Modal.Body>
        </Modal>

    )
}

export default ModalTurno
