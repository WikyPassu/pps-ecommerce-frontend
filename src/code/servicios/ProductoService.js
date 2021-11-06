// import samples from "../../samples/productos.json";
import UtilsService from "./UtilsService";
export default class ProductoService {
	static productos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.productos);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* @todo TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		try{
			const res = await fetch(UtilsService.getUrlsApi().productos.traerTodos);
			const data = await res.json();
			console.log(data);
			this.productos = data.productos;
			this.notifySubscribers();
			return this.productos;
		}catch(err){
			console.log(err);
		}
	}


	static getProductos() {
		return this.productos;
	}

	static getProductoPorId(_id) {
		return this.productos.filter(c => c._id === _id)[0];
	}

	/**
 * @todo PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
 * @param {*} consulta 
 * @returns 
 */
	 static async getProductosPorBusqueda(consulta) {
		// try {
		// 	let res = await fetch(UtilsService.getUrlsApi().productos.buscar, {
		// 		method: 'GET',
		// 		cache: 'no-cache',
		// 		credentials: 'same-origin',
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: consulta,
		// 	})
		// 	if (res.ok) {
		// 		let jsonData = await res.json();
		// 		this.productos = jsonData.productos;
		// 		console.log(jsonData.mensaje);
		// 		this.notifySubscribers();
		// 		return this.productos;
		// 	}
		// 	else {
		// 		//console.log(jsonData);
		// 		Promise.reject(res.statusText);
		// 		return this.productos;
		// 	}
		// } catch (error) {
		// 	Promise.reject(error.message);
		// 	return this.productos;
		// }
	 }

	/**
	 * @todo Obtener mas vendido. Si el numero de ventas son iguales, agarrar cualquiera
	 * @returns 
	 */
	 static async getMasVendido() {
		//console.info("HERE");
		// try {
		// 	let res = await fetch(UtilsService.getUrlsApi().productos.traerMasVendido, {
		// 		method: 'GET',
		// 		cache: 'no-cache',
		// 		credentials: 'same-origin',
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 	})
		// 	if (res.ok){
		// 		let jsonData = await res.json();
		// 		console.log(jsonData.mensaje);
				
		// 		//console.info(jsonData);
		// 		this.notifySubscribers();
		// 		return jsonData;
		// 	}
		// 	else {
		// 		//console.log(res);
		// 		Promise.reject(res.statusText);
		// 	}
		// } catch (error) {
		// 	Promise.reject(error.message);
		// }
	}

	/**
	 * @todo Obtener productos ordenados con los productos cargados en el servicio. No usar backend
	 * @param {*} tipoOrden MAS_VENDIDOS | MAYOR_PRECIO | MENOR_PRECIO
	 * @returns 
	 */
	static getProductosOrdenados(tipoOrden) {
		return this.productos;
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	 static async addProducto(newItem) 
	 {
		//console.log(newItem);
		// fetch(UtilsService.getUrlsApi().productos.agregar, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({producto: newItem})
		// })
		// .then(res => res.json())
		// .then(data => console.log(data))
		// .catch(err => console.log(err));

		 //console.info(newItem);
		 //try {
		// 	 let res = await fetch(UtilsService.getUrlsApi().productos.agregar, {
		// 		 method: 'POST',
		// 		 cache: 'no-cache',
		// 		 mode: 'no-cors',
		// 		 credentials: 'same-origin',
		// 		 headers: {
		// 			 'Accept': 'application/json',
		// 			 'Content-Type': 'application/json'
		// 		 },
		// 		 body: JSON.stringify({ producto: newItem })
		// 	 })
		// 	 if (res.ok){
		// 		 let jsonData = await res.json();
		// 		 console.log(jsonData.mensaje);
		// 		 console.info(jsonData);
		// 		 this.productos.push(newItem);
		// 		 this.notifySubscribers();
		// 		 return jsonData;
		// 	 }
		// 	 else {
		// 		let jsonData = await res.json();
		// 		 console.info(jsonData);
		// 		 //Promise.reject(res.statusText);
		// 	 }
		//  } catch (error) {
		// 	 console.info(error);
		// 	 //Promise.reject(error.message);
		//  }
	 }

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyProducto(item) {
		// let _id = JSON.stringify(item);
		// delete item._id;
		// _id = JSON.parse(_id);
		// _id = _id._id;
		// console.log(_id);
		// fetch(UtilsService.getUrlsApi().productos.modificar, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		_id: _id,
		// 		producto: item
		// 	})
		// })
		// .then(res => res.json())
		// .then(data => console.log(data))
		// .catch(err => console.log(err));
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeProducto(_id) {
		// this.productos = this.productos.filter((c) => (c._id !== _id));
		// this.notifySubscribers();
	}


}