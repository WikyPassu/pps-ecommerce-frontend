import samples from "../../samples/productos.json";
//import UtilsService from "./UtilsService";
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
		console.log('Servicio productos iniciado');
		this.productos = samples;
		return samples;
		// try {
		// 	let res = await fetch(UtilsService.getUrlsApi().productos.traerTodos, {
		// 		method: 'POST',
		// 		cache: 'no-cache',
		// 		credentials: 'same-origin',
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json'
		// 		}
		// 	})
		// 	if (res.ok) {
		// 		let jsonData = await res.json();
		// 		console.log("data", jsonData);
		// 		this.productos = samples;// jsonData.productos
		// 		return this.productos;
		// 	}
		// 	else {
		// 		//console.log(res);
		// 		Promise.reject("Error al traer los productos: "+res.statusText);
		// 	}
		// } catch (error) {
		// 	Promise.reject("Error al traer los productos: "+error.message);
		// }
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
		return this.productos;
	}

	/**
	 * @todo Obtener mas vendido. Si el numero de ventas son iguales, agarrar cualquiera
	 * @returns 
	 */
	static getMasVendido() {
		return this.productos[0];
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
	static async addProducto(newItem) {
		this.productos.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyProducto(item) {
		console.log("Modificar producto", item);
		this.productos = this.productos.map((c) => (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeProducto(_id) {
		this.productos = this.productos.filter((c) => (c._id !== _id));
		this.notifySubscribers();
	}


}