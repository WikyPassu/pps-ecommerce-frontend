import { useEffect, useState } from 'react';
//import { Button } from 'react-bootstrap';
import TurnoService from '../../../../servicios/TurnoService';
import UtilsService from '../../../../servicios/UtilsService';
import Listado from '../../listado/Listado';
import FormTurnoModal from './formTurnoModal/FormTurnoModal';

export default function Turnos() {
  const [lista, setLista] = useState(TurnoService.getTurnos());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  TurnoService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });

  useEffect(() => {
    TurnoService.iniciarServicio();
  }, [])

  //window.location.reload();
  return (<>
    <label className="titulo-seccion">Turnos</label>
    {/* <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Turno</Button> */}
    {modalForm && <FormTurnoModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
      columnas={[
        "ID",
        "Servicio",
        "Precio",
        "DNI Cliente",
        "DNI Empleado",
        "Fecha",
        "Estado"
      ]}
      atributos={[
        "_id",
        "servicio",
        "precio",
        "dniCliente",
        "dniEmpleado",
        "fecha",
        "estado"
      ]}
      attrFuncs={[
        { columnaIndex: 1, attrFunc: (value, obj) => value.nombre },
        { columnaIndex: 5, attrFunc: UtilsService.timeStampToStringDate }
      ]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setElementoModificar(e);
      }}
      onDeleteClick={(p) => { TurnoService.removeTurno(p._id) }}
      attrKey="_id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormTurnoModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(TurnoService.getTurnos());
      }} />}

  </>)
}