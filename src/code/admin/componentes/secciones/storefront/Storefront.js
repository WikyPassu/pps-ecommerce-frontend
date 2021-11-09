import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
//import ClienteService from '../../../../servicios/ClienteService';
//import Listado from '../../listado/Listado';
//import FormClienteModal from './formStorefrontModal/FormStorefrontModal';

// const initialValuesElemento = {
//   "ordenListadoProductos": "RECIENTES",
//   "ordenListadoServicios": "MAYOR_PRECIO"
// };

export default function Storefront() {
  //const [lista, setLista] = useState(ClienteService.getClientes());
  //const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  //const [elementoModificar, setElementoModificar] = useState(undefined);
  //const [elemento, setElemento] = useState(initialValuesElemento);
  //const [modalForm, setModalForm] = useState(false);
  // const handleChange = (e) => {
  //   setElemento((elemento) => {
  //     return { ...elemento, [e.target.name]: e.target.value }
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // (modificar === true) ? ClienteService.modifyCliente(elemento) : ClienteService.addCliente(elemento);
    //onHide();
  }
  // ClienteService.subscribe((nuevaLista) => {
  //   setLista(nuevaLista);
  // })
  return (
    <div>
      <label className="title-factura">Configuracion del Storefront</label><br />
      {/* <span><Button onClick={() => setModalForm(true)} className="btn-agregar">Registrar Cliente</Button></span> */}
      {/* {modalForm && <FormClienteModal show={modalForm} onHide={() => { setModalForm(false) }} />} */}
      <Form noValidate onSubmit={handleSubmit}>
        
        <InputGroup className="input-formulario">
          <InputGroup.Text>Orden de listado de productos</InputGroup.Text>
          {/* <FormControl onChange={handleChange} value={elemento.nombre} name="ordenListadoProductos" required placeholder="Ordern de listado de productos" /> */}
          <Form.Select name="ordenListadoProductos">
            <option value="MAS_VENDIDOS">MAS_VENDIDOS</option>
            <option value="MAYOR_PRECIO">MAYOR PRECIO</option>
            <option value="MENOR_PRECIO">MENOR PRECIO</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="input-formulario">
          <InputGroup.Text>Orden de listado de servicios</InputGroup.Text>
          {/* <FormControl onChange={handleChange} value={elemento.nombre} name="ordenListadoProductos" required placeholder="Ordern de listado de productos" /> */}
          <Form.Select name="ordenListadoServicios">
            <option value="MAS_VENDIDOS">MAS_VENDIDOS</option>
            <option value="MAYOR_PRECIO">MAYOR PRECIO</option>
            <option value="MENOR_PRECIO">MENOR PRECIO</option>
          </Form.Select>
        </InputGroup>
        <br/>
        <Row>
          <Col>
            <Button type="submit" size="lg">Guardar cambios</Button>
          </Col>
        </Row>
      </Form>

    </div>
  )

}