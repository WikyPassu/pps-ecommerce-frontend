import UtilsService from "./UtilsService";
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
	* TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.traerTodos);
			const data = await res.json();
			console.log(data);
			this.servicios = data.servicios;
			this.notifySubscribers();
			return this.servicios;
		} catch (err) {
			console.log(err);
		}
	}



	static getServicios() {
		return this.servicios;
	}

	static getServicioPorId(_id) {
		return this.servicios.filter(c => c._id === _id)[0];
	}

	/**
	 *  PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
	 * @todo CULAS: se rompe en front. avisame si lo arreglas y tengo algo mal xq no pude testear
	 * @param {*} busqueda 
	 * @returns 
	 */
	static async getServiciosPorBusqueda(busqueda) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.buscar, {
				method: 'POST',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ busqueda: busqueda }),
			});
			const data = await res.json();
			console.log(data);
			this.notifySubscribers();

			return data.servicios;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	  * Obtener mas vendido. Si el numero de ventas son iguales, agarrar cualquiera
	  * @returns 
	  */
	static async getMasVendido() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.traerMasVendido);
			const data = await res.json();
			console.log(data);
			this.notifySubscribers();

			return data.producto;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * Obtener servicios ordenados con los servicios cargados en el servicio. No usar backend
	 * @todo CULAS: los servicios no tienen mayor precio y menor precio porque dependen del perro
	 * @param {*} tipoOrden MAS_VENDIDOS | ?MAYOR_PRECIO | ?MENOR_PRECIO
	 * @returns 
	 */
	static async getServiciosOrdenados(tipoOrden) {
		console.info(this.servicios);

		switch (tipoOrden) {
			case "MAS_VENDIDOS":
				try {
					const res = await fetch(UtilsService.getUrlsApi().servicios.traerMasVendidos);
					const data = await res.json();
					console.log(data);
					this.servicios = data.servicios;
					this.notifySubscribers();

					return data.servicios;
				} catch (err) {
					console.log(err);
				}
				break;
			default:
				console.error("ERROR: codigo inalcanzable");
				break;
		}
		console.info(this.servicios);
		return this.servicios;
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: el front no permite cargar servicio, no toma las imagenes? no lo se. si cargo la imagen a una pagina y uso ese link si funciona..
	 * @todo CULAS: de todas formas no me permite apretar el boton guardar q isistes por favor testealo 
	 * @param {*} newItem 
	 */
	static async addServicio(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ servicio: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.servicios.push(newItem);
			//this.notifySubscribers();
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyServicio(item) {
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, servicio: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.servicios = this.servicios.map((c) => (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeServicio(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().servicio.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.log(data);
			this.servicios = this.servicios.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: testear
	 * @param {*} resenia 
	 * @param {*} idServicio 
	 */
	static async addResenia(resenia, idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		console.log("Servicio Encontrado: ", servicio);
		console.log("Resenia a agregar: ", resenia);
		if (servicio) {
			try {
				const res = await fetch(UtilsService.getUrlsApi().resenia.agregar, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ resenia: resenia })
				});
				const data = await res.json();
				console.log(data);
				servicio.resenias.push(resenia);
				this.modifyServicio(servicio);
				this.notifySubscribers();
			} catch (err) {
				console.log(err);
			}
		}
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND // culas dijo que es un error y que ignore esta funcion
	 * @param {*} idServicio 
	 * @returns 
	 */
	static getResenias(idServicio) {
		let servicio = this.getServicioPorId(idServicio);
		return servicio.resenias;
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: testear
	 * @param {*} idResenia 
	 * @param {*} idServicio 
	 */
	static async removeResenia(idResenia, idServicio) {
		let servicio = this.getServicioPorId(idServicio);


		try {
			const res = await fetch(UtilsService.getUrlsApi().resenia.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: idResenia })
			});
			const data = await res.json();
			console.log(data);
			servicio.resenias = servicio.resenias.filter(r => r._id !== idResenia);
			this.modifyServicio(servicio);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}
}