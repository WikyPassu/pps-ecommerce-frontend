import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ConsumibleService from '../../../../servicios/ConsumibleService';
import Listado from '../../listado/Listado';
import FormConsumibleModal from './formConsumibleModal/FormConsumibleModal';

export default function Consumibles() {
  const [lista, setLista] = useState(ConsumibleService.getConsumibles());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);

  ConsumibleService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  });
  return (<>
    <label className="titulo-seccion">Consumibles</label>
    <Button className="btn-agregar" onClick={() => setModalForm(true)}>Agregar Consumible</Button>
    {modalForm && <FormConsumibleModal
      show={modalForm}
      onHide={() => { setModalForm(false) }} />}
    <Listado
    columnas={[
          "ID",
          "Nombre",
          "Existencia",
          "Existencia Minima",
          "Precio Unidad"
        ]}

        attrFuncs={[
          {
            columnaIndex:2, attrFunc:(value, object)=>{return (parseFloat(value)).toFixed(2)}
          }
        ]}
      
    atributos={[
      "_id",
      "nombre",
      "existencia",
      "existenciaMinima",
      "precioUnidad"
    ]}
      onEditClick={(e) => {
        setMostrarModalModificar(true);
        setElementoModificar(e);
      }}
      onDeleteClick={(p)=>{ConsumibleService.removeConsumible(p._id)}}
      attrKey="_id"
      datos={lista}></Listado>
    {mostrarModalModificar && <FormConsumibleModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(ConsumibleService.getConsumibles());
      }} />}

  </>)
}