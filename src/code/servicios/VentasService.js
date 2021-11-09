import samples from "../../samples/facturas.json";
export default class FacturasService{
	static facturas = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.facturas);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* @todo TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio(){
		console.log('Servicio Facturas iniciado');
		this.facturas = samples;
		return samples;
	}

	static getFacturas() {
		return this.facturas;
	}

    static getFacturaPorId(_id){
        return this.facturas.filter(c => c._id === _id)[0];
    }

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 * @return Factura creada y guardada en la bd
	 */
	static async addFactura(newItem) {
		this.facturas.push(newItem);
		this.notifySubscribers();
		return; //facturaGenerada;
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyFactura(item){
		this.facturas = this.facturas.map((c)=> (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeFactura(_id) {
		this.facturas = this.facturas.filter((c)=> (c._id !== _id));
		this.notifySubscribers();
	}

	// static async realizarPago(items = []){
	// 	if(items.length > 0){
	// 		fetch(urlPago,{
	// 			method: 'POST', // *GET, POST, PUT, DELETE, etc.
	// 			//mode: 'cors', // no-cors, *cors, same-origin
	// 			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	// 			credentials: 'same-origin', // include, *same-origin, omit
	// 			headers: {
	// 				'Accept': 'application/json',
	// 			  'Content-Type': 'application/json'
	// 			},
	// 			body:JSON.stringify({productos:CarritoService.getItems()})
	// 		})
	// 		.then(async (res)=>{
	// 			if(res.ok){
	// 				let jsonData = await res.json();
	// 				console.log(jsonData);
	// 				window.location.href = jsonData.mercadoPago.response.init_point;
	// 			}
	// 			else{
	// 				console.log(res);
	// 			}
	// 		})
	// 	}
	// 	Promise.reject({message:"No puede realizarse un pago si no se ha seleccionado al menos un item"});
	// }
}