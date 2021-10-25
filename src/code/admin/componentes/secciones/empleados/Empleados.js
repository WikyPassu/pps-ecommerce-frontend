import { useState } from 'react';
import { Button } from 'react-bootstrap';
import EmpleadoService from '../../../../servicios/EmpleadoService';
import Listado from '../../listado/Listado';
import FormEmpleadoModal from './formEmpleadoModal/FormEmpleadoModal';

export default function Empleados() {
  const [lista, setLista] = useState(EmpleadoService.getempleados());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  EmpleadoService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });
  return (<>
    <label className="titulo-seccion">Empleados</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar empleado</Button>
    {modalForm && <FormEmpleadoModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
      columnas={[
        "Apellido",
        "Nombre",
        "Correo",
        "DNI",
        "Tipo"
      ]}
      atributos={[
        "apellido",
        "nombre",
        "correo",
        "dni",
        "tipo"
      ]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setElementoModificar(e);
      }}
      onDeleteClick={(p) => {
        EmpleadoService.removeEmpleado(p.id);
      }}
      attrKey="id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormEmpleadoModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(EmpleadoService.getempleados());
      }} />}

  </>)
}