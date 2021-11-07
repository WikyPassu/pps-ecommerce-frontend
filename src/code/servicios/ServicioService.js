import samples from "../../samples/servicios.json";
export default class ServicioService {
	static servicios = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.servicios);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* @todo TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		console.log('Servicio servicios iniciado');
		this.servicios = samples;
		this.notifySubscribers();
		return samples;
	}



	static getServicios() {
		return this.servicios;
	}

	static getServicioPorId(_id) {
		// eslint-disable-next-line
		return this.servicios.filter(c => c._id == _id)[0];
	}

	/**
	 * @todo PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
	 * @param {*} consulta 
	 * @returns 
	 */
	static async getServiciosPorBusqueda(consulta) {
		return this.servicios;
	}

	/**
 	* @todo Obtener mas vendido. Si el numero de ventas son iguales, agarrar cualquiera
 	* @returns 
 	*/
	static getMasVendido() {
		return this.servicios[0];
	}

	/**
	 * @todo Obtener servicios ordenados con los servicios cargados en el servicio. No usar backend
	 * @param {*} tipoOrden MAS_VENDIDOS | MAYOR_PRECIO | MENOR_PRECIO
	 * @returns 
	 */
	static getServiciosOrdenados(tipoOrden){
		return this.servicios;
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addServicio(newItem) {
		this.servicios.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyServicio(item) {
		this.servicios = this.servicios.map((c) => (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeServicio(_id) {
		this.servicios = this.servicios.filter((c) => (c._id !== _id));
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} resenia 
	 * @param {*} idServicio 
	 */
	static async addResenia(resenia, idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		console.log("Servicio Encontrado: ", servicio);
		console.log("Resenia a agregar: ", resenia);
		if (servicio) {
			servicio.resenias.push(resenia);
			this.modifyServicio(servicio);
			this.notifySubscribers();
		}
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} idServicio 
	 * @returns 
	 */
	static getResenias(idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		return servicio.resenias;
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} idResenia 
	 * @param {*} idServicio 
	 */
	static async removeResenia(idResenia, idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		servicio.resenias = servicio.resenias.filter(r => r._id !== idResenia);
		this.modifyServicio(servicio);
		this.notifySubscribers();
	}
}