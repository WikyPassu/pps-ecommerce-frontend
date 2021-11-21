import { useState } from 'react';
import { Button } from 'react-bootstrap';
import EnviosService from '../../../../servicios/EnviosService';
import Listado from '../../listado/Listado';
import FormConsumibleModal from './formPrecioEnvios/FormPrecioEnvioModal';

export default function PrecioEnvios() {
  const [lista, setLista] = useState(EnviosService.getPrecioEnvios());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  EnviosService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });
  return (<>
    <label className="titulo-seccion">Precios de Envio</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Localidad</Button>
    {modalForm && <FormConsumibleModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
    atributos={[
      "localidad",
      "precio"
    ]}
    attrFuncs={[{columnaIndex:0,attrFunc:(v)=>v === "*"?"(Otras Localidades)" : v}]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setElementoModificar(e);
      }}
      onDeleteClick={(p)=>{
        if(p.localidad === "*"){
          alert("No está permitido borrar el precio genérico")
          return;
        }
        EnviosService.removePrecioEnvios(p._id)
      }}
      attrKey="_id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormConsumibleModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(EnviosService.getPrecioEnvios());
      }} />}

  </>)
}