import { Bar } from 'react-chartjs-2';

function getLabels(datos = []){
  return datos.map((element)=>{
    return element.x
  })
}

function getData(datos = []){
  return datos.map((element)=>{
    return element.y
  })
}
/**
 * 
 * @param {*} param0 Los datos deben contener la estructura {x:"valorDeX",y:"valorDeY"}
 * @returns 
 */
function Grafico({datos,titulo}) {

  return <Bar data={{
    labels: getLabels(datos),
    datasets: [{
      label: titulo,
      data: getData(datos),
      backgroundColor: ['#f0c059'],
      borderColor: ['#db9600'],
      borderWidth: 1
    }]
  }} style={{maxHeight:"450px"}}/>;
}

Grafico.defaultProps = {
  datos:[],
  titulo:"Cantidad de Algo"
}

export default Grafico;