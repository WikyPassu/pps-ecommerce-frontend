import Listado from '../../listado/Listado';
import Grafico from '../../grafico/Grafico';
import { useState } from 'react';
import { Form, Row, Button, InputGroup, Col } from 'react-bootstrap';
import FacturasService from '../../../../servicios/VentasService';
import FormFacturaModal from './formFacturaModal/FormFacturaModal';
import UtilsService from '../../../../servicios/UtilsService';

/**
 * Las ventas son lo mismo facturas pero con nombre diferente.
 * Queda mejor si lo representamos como ventas en lugar de facturas.
 */
export default function Ventas() {
  const [lista, setLista] = useState(FacturasService.getFacturas());
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [elementoModificar, setElementoModificar] = useState(undefined);
  const [modalForm, setModalForm] = useState(false);
  FacturasService.subscribe((nuevaLista) => {
    setLista(nuevaLista);
  })
  return (
    <div className="seccion-ventas">
      <label className="titulo-seccion">Ventas Realizadas</label>
      <Row>
        <Col sm={3}>
          <InputGroup>
            <Form.Select>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col>
          <Button 
          className="btn-agregar"
            onClick={() => setModalForm(true)}>Agregar Venta</Button>
          {modalForm && <FormFacturaModal
            show={modalForm}
            onHide={() => { setModalForm(false) }} />}
        </Col>
      </Row>

      <Grafico datos={[
        { x: "Enero", y: 10 },
        { x: "Febrero", y: 15 },
        { x: "Marzo", y: 27 },
        { x: "Abril", y: 25 },
        { x: "Mayo", y: 8 },
        { x: "Junio", y: 6 },
        { x: "Julio", y: 5 },
        { x: "Agosto", y: 7 },
        { x: "Septiembre", y: 9 },
        { x: "Octubre", y: 8 },
        { x: "Noviembre", y: 15 },
        { x: "Diciembre", y: 18 }
      ]} titulo="Cantidad de Ventas" />
      <br />
      <Listado
        columnas={["ID", "Total", "Fecha", "Estado"]}
        atributos={["_id", "total", "fecha", "estado"]}
        attrKey={"_id"}
        onEditClick={(e) => {
          setMostrarModalModificar(true);
          setElementoModificar(e);
        }}
        attrFuncs={[{columnaIndex:2,attrFunc:(e)=>UtilsService.timeStampToStringDate(e)}]}
        datos={lista}
      />
      {mostrarModalModificar && <FormFacturaModal
      elementoParaModificar={elementoModificar}
      show={mostrarModalModificar}
      onHide={() => {
        setMostrarModalModificar(false);
        setLista(FacturasService.getFacturas());
      }} />}
    </div>)
}