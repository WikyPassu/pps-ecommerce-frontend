import Listado from '../../listado/Listado';
import Grafico from '../../grafico/Grafico';
import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import FacturasService from '../../../../servicios/VentasService';
import FormFacturaDetallesModal from './formFacturaDetallesModal/FormFacturaDetallesModal';
import FormFacturaModal from './formFacturaModal/FormFacturaModal';

/**
 * Las ventas son lo mismo facturas pero con nombre diferente.
 * Queda mejor si lo representamos como ventas en lugar de facturas.
 */
export default function Ventas() {
  // const [lista, setLista] = useState(FacturasService.getFacturas());
  // const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  // const [elementoModificar, setElementoModificar] = useState(undefined);
  const [elementoMostrar, setElementoMostrar] = useState(undefined);
  const [mostrarDetalleModal, setMostrarDetalleModal] = useState(false);


  const [modalForm, setModalForm] = useState(false);
  const [pagos, setPagos] = useState(FacturasService.getPagos());
  FacturasService.subscribe((nuevaLista) => {
    // setLista(nuevaLista);
    setPagos(FacturasService.getPagos())
    //console.log(FacturasService.getPagos());
  })
  useEffect(() => {
    FacturasService.iniciarServicio();
  }, [])
  return (
    <div className="seccion-ventas">
      <label className="titulo-seccion">Ventas Realizadas</label>
      <Row>
        {/* <Col sm={3}>
          <InputGroup>
            <Form.Select>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </Form.Select>
          </InputGroup>
        </Col> */}
        <Col>
          <Button
            className="btn-agregar"
            onClick={() => setModalForm(true)}>Agregar Venta</Button>
          {modalForm && <FormFacturaModal
            show={modalForm}
            onHide={() => { setModalForm(false) }} />}
        </Col>
      </Row>

            
      <Grafico datos={FacturasService.getPagosPorMes()} titulo="Cantidad de Ventas" />
      <br />
      {/* <Listado
        columnas={["ID", "Total", "Fecha", "Estado"]}
        atributos={["_id", "total", "fecha", "estado"]}
        attrKey={"_id"}
        onEditClick={(e) => {
          setMostrarModalModificar(true);
          setElementoModificar(e);
        }}
        attrFuncs={[{columnaIndex:2,attrFunc:(e)=>UtilsService.timeStampToStringDate(e)}]}
        datos={lista}
      /> */}
      <Listado
        columnas={["ID", "Total", "Fecha", "Comprador", "Estado"]}
        atributos={["id", "amount", "date_created", "payer", "status"]}
        attrKey={"id"}
        attrFuncs={[{ columnaIndex: 3, attrFunc: (c) => c.email }]}
        // onEditClick={(e) => {
        //   setMostrarModalModificar(true);
        //   setElementoModificar(e);
        // }}
        onShowClick={(e) => {
          console.log(e)
          setMostrarDetalleModal(true);
          setElementoMostrar(e);
        }
        }
        datos={pagos}
      />
      {mostrarDetalleModal && <FormFacturaDetallesModal
        show={mostrarDetalleModal}
        elementoParaMostrar={elementoMostrar}
        onHide={() => {
          setMostrarDetalleModal(false);
          // setLista(FacturasService.getFacturas());
        }} />}


      {/* {mostrarModalModificar && <FormFacturaModal
        elementoParaModificar={elementoModificar}
        show={mostrarModalModificar}
        onHide={() => {
          setMostrarModalModificar(false);
          setLista(FacturasService.getFacturas());
        }} />} */}
    </div>)
}