import UtilsService from "./UtilsService";
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
	* TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio(){
		console.log('Servicio Facturas iniciado');
		try {
			const res = await fetch(UtilsService.getUrlsApi().factura.traerTodas);
			const data = await res.json();
			console.log(data);
			this.facturas = data.facturas;
			this.notifySubscribers();
			return this.facturas;
		} catch (err) {
			console.log(err);
		}

		return this.facturas;
	}

	static getFacturas() {
		return this.facturas;
	}

    static getFacturaPorId(_id){
        return this.facturas.filter(c => c._id === _id)[0];
    }

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: api devuelve error 500
	 * @param {*} newItem 
	 * @return Factura creada y guardada en la bd ?? revisalo culas 
	 */
	static async addFactura(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().factura.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ factura: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.facturas.push(newItem);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: error 500
	 * @param {*} item 
	 */
	static async modifyFactura(item){
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().factura.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, factura: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.facturas = this.facturas.map((c)=> (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: no hay boton eliminar, no puedo testear
	 * @param {*} _id ID del objeto
	 */
	static async removeFactura(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().factura.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.log(data);
			this.facturas = this.facturas.filter((c)=> (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
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