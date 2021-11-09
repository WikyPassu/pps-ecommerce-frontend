import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ClienteService from '../../../../servicios/ClienteService';
import Listado from '../../listado/Listado';
import FormClienteModal from './formClienteModal/FormClienteModal';
export default function Clientes() {
  const [lista, setLista] = useState(ClienteService.getClientes());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);
  ClienteService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  })
  return (
    <div>
      <label className="titulo-seccion">Clientes registrados</label>
      <span><Button onClick={() => setModalForm(true)} className="btn-agregar">Registrar Cliente</Button></span>
      {modalForm && <FormClienteModal show={modalForm} onHide={() => { setModalForm(false) }} />}
      <Listado
        columnas={["DNI", "Nombre", "Apellido", "Correo", "Estado"]}
        atributos={["dni", "nombre", "apellido", "correo", "estado"]}
        attrKey={"_id"}
        onEditClick={(c) => {
          setMostrarModalModificar(true);
          setElementoModificar(c);
        }}
        onDeleteClick={(c)=>ClienteService.removeCliente(c._id)}
        datos={lista}
      />
      {mostrarModalModificar && <FormClienteModal
        elementoParaModificar={elementoModificar}
        show={mostrarModalModificar}
        onHide={() => {
          setMostrarModalModificar(false);
          setLista(ClienteService.getClientes());
        }} />}
    </div>
  )

}