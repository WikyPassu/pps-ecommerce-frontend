import samples from "../../samples/productos.json";
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
	}


	static getProductos() {
		return this.productos;
	}

	static getProductoPorId(id) {
		return this.productos.filter(c => c.id === id)[0];
	}

	/**
 * @todo PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
 * @param {*} consulta 
 * @returns 
 */
	static getProductosPorBusqueda(consulta) {
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
	 * @param {*} tipoOrden RECIENTES | MAYOR_PRECIO | MENOR_PRECIO
	 * @returns 
	 */
	static getProductosOrdenados(tipoOrden) {
		return this.productos;
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addProducto(newItem) {
		this.productos.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyProducto(item) {
		console.log("Modificar producto", item);
		this.productos = this.productos.map((c) => (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	static removeProducto(id) {
		this.productos = this.productos.filter((c) => (c.id !== id));
		this.notifySubscribers();
	}


}