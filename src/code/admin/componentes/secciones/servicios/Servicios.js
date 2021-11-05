import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ServicioService from '../../../../servicios/ServicioService';
import Listado from '../../listado/Listado';
import FormServicioModal from './formServicioModal/FormServicioModal';

export default function Servicios() {
  const [lista, setLista] = useState(ServicioService.getServicios());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  ServicioService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });
  return (<>
    <label className="titulo-seccion">Servicios ofrecidos</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Servicio</Button>
    {modalForm && <FormServicioModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
    columnas={[
          "ID",
          "Nombre",
          "Categoria",
          "Descripción",
          "Estado"
        ]}
    atributos={[
      "_id",
      "nombre",
      "categoria",
      "descripcion",
      "estado"
    ]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setElementoModificar(e);
      }}
      onDeleteClick={(p)=>{ServicioService.removeServicio(p._id)}}
      attrKey="_id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormServicioModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(ServicioService.getServicios());
      }} />}

  </>)
}