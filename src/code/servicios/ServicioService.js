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

		return samples;
	}



	static getServicios() {
		return this.servicios;
	}

	static getServicioPorId(id) {
		return this.servicios.filter(c => c.id === id)[0];
	}

	/**
	 * @todo PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
	 * @param {*} consulta 
	 * @returns 
	 */
	static getServiciosPorBusqueda(consulta) {
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
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addServicio(newItem) {
		this.servicios.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyServicio(item) {
		this.servicios = this.servicios.map((c) => (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	static removeServicio(id) {
		this.servicios = this.servicios.filter((c) => (c.id !== id));
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} resenia 
	 * @param {*} idServicio 
	 */
	static addResenia(resenia, idServicio) {
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
	static removeResenia(idResenia, idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		servicio.resenias = servicio.resenias.filter(r => r.id !== idResenia);
		this.modifyServicio(servicio);
		this.notifySubscribers();
	}
}