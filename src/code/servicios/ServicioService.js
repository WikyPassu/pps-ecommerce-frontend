import UtilsService from "./UtilsService";
import ComsumiblesService from "./ConsumibleService";
import TurnoService from "./TurnoService";
import FacturasService from "./VentasService";

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
			this.servicios = !data.servicios ? [] : data.servicios.map((c) => {
				if (c.categoria === "banio") {
					c.duracion = 60
				}
				else if (c.categoria === "corte_de_pelo") {
					c.duracion = 90
				}
				else if (c.categoria === "guarderia") {
					c.duracion = 60
				}
				return c;
			});
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
			let pagos = await FacturasService.getPagosFromMercadoPago()


			const items = pagos
				.reduce((prev, curr) => {
					return [...prev, ...curr.items];
				}, [])
				.filter((c) => {
					return c.title.includes("Servicio");
				})
				.map((c) => {
					return {
						producto: c.title,
						cantidad: parseInt(c.quantity)
					}
				})

			let itemMaxVendido = items.reduce((previous, current) => {
				let existeProducto = previous.find(c => c.producto === current.producto);
				if (existeProducto) {
					return previous.map(c => {
						if (c.producto === current.producto) {
							let suma = c.cantidad + current.cantidad;
							c.cantidad = suma;
						}
						return c;
					});
				}
				else {
					previous.push(current);
					return previous;
				}

			}, [])
				.filter((c) => {
					return this.getServicios().find((v) => {
						return v.nombre === c.producto;
					}) ? true : false;
				})
				.reduce((prev, curr) => {
					if (!prev) {
						return curr;
					}
					if (curr.cantidad > prev.cantidad) {
						return curr;
					}
					else {
						return prev;
					}
				}, null)
				

			return this.getServicios().find((c) => c.nombre === itemMaxVendido.producto);

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

		switch (tipoOrden) {
			case "MAS_VENDIDOS":
				try {
					const res = await fetch(UtilsService.getUrlsApi().servicios.traerMasVendidos);
					const data = await res.json();
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
			await fetch(UtilsService.getUrlsApi().servicio.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ servicio: newItem })
			});
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
			await fetch(UtilsService.getUrlsApi().servicio.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, servicio: item })
			});
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
			await fetch(UtilsService.getUrlsApi().servicio.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
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
		try {
			let servicio = this.getServicioPorId(idServicio);
			if (servicio) {
				await fetch(UtilsService.getUrlsApi().resenia.agregar, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ resenia: resenia })
				});
				servicio.resenias.push(resenia);
				this.modifyServicio(servicio);
				this.notifySubscribers();
				return true;
			}
		} catch (err) {
			console.log(err);
			return false;
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
			servicio.resenias = servicio.resenias.filter(r => r._id !== idResenia);
			await this.modifyServicio(servicio);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	static calcularCostoDelServicio(servicio, perrito) {
		let costo = {
			precio: 0,
			consumibles: []
		};
		const {consumible, gramosPerroPorUnidad, porcentajeGanancia, precioMinimo} = servicio.costo;
		let consumibleOriginal = ComsumiblesService.getConsumiblePorNombre(consumible);
		let costoComsumible = {
			cantidad: 0,
			consumible: consumibleOriginal
		}
		costoComsumible.cantidad = (perrito.peso * 1000) / gramosPerroPorUnidad;
		costo.precio = (costoComsumible.cantidad * consumibleOriginal.precioUnidad) * (porcentajeGanancia/100+1);

		if(costo.precio < precioMinimo){
			costo.precio = precioMinimo;
		}
		
		costo.precio = parseFloat(costo.precio);
		costo.consumibles.push(costoComsumible)
		return costo;
	}

	// static calcularCostoDelServicio(servicio, perrito) {
	// 	let costo = {
	// 		precio: 0,
	// 		consumibles: []
	// 	};
	// 	const {consumible, gramosPerroPorUnidad, porcentajeGanancia} = servicio.costo;
	// 	let consumibleOriginal = ComsumiblesService.getConsumiblePorNombre(consumible);
	// 	let costoComsumible = {
	// 		cantidad: 0,
	// 		consumible: consumibleOriginal
	// 	}
	// 	costoComsumible.cantidad = (perrito.peso * 1000) / gramosPerroPorUnidad;

	// 	if (perrito.peso < 8){
			
	// 		costo.precio = ((8 * 1000) / gramosPerroPorUnidad) * consumibleOriginal.precioUnidad * (porcentajeGanancia/100+1);
	// 	}
	// 	else if(servicio.categoria === "guarderia" && perrito.peso < 20){
	// 		costo.precio = ((20 * 1000) / gramosPerroPorUnidad) * consumibleOriginal.precioUnidad * (porcentajeGanancia/100+1);
	// 	}
	// 	else{
	// 		costo.precio = (costoComsumible.cantidad * consumibleOriginal.precioUnidad) * (porcentajeGanancia/100+1);
	// 	}
	// 	costo.precio = parseInt(costo.precio);
	// 	costo.consumibles.push(costoComsumible)
	// 	return costo;
	// }

	/**
	 * Devuelve los horarios disponibles para este servicio
	 * @param {*} servicio 
	 * @param {Date} fecha
	 * @returns 
	 */
	static getHorariosPorServicio(servicio, fecha) {
		//600 minutos o 10 Hs correspondiente al horario de trabajo (8 a 18hs)
		const turnosAsociados = TurnoService.getTurnos().filter((turno) => turno.servicio._id === servicio._id && turno.estado === "PENDIENTE");
		const unidad = servicio.duracion * 60 * 1000;
		let horarioReferencia = (new Date(11 * 60 * 60 * 1000));
		const horarioFinal = (new Date(21 * 60 * 60 * 1000));
		const horarios = [];
		for (let i = 0; horarioReferencia.getTime() <= horarioFinal.getTime(); i++) {
			const horario = ("0" + horarioReferencia.getHours()).slice(-2) + ":" + ("0" + horarioReferencia.getMinutes()).slice(-2);
			const turnoMismoHorarioDia = turnosAsociados.find((turno) => {
				let fechaTurno = new Date(turno.fecha);
				return (
					fechaTurno.getDate() === fecha.getDate() &&
					fechaTurno.getMonth() === fecha.getMonth() &&
					fechaTurno.getFullYear() === fecha.getFullYear() &&
					fechaTurno.getHours() === horarioReferencia.getHours() &&
					fechaTurno.getMinutes() === horarioReferencia.getMinutes()
				);
			})
			horarioReferencia.setTime(horarioReferencia.getTime() + unidad);
			if(!turnoMismoHorarioDia && horarioReferencia.getTime() <= horarioFinal.getTime() ){
				horarios.push(horario);
			}
		}
		return horarios;
	}

	/**
	 * Busca todos los dias NO disponibles para un servicio
	 * @param {String} idServicio 
	 * @returns {Date[]}
	 */
	static getDiasNoDisponiblesPorServicio(servicio){
		let fecha = new Date();
		let diasNoDisponibles = [];
		for(let i=1;i<=60;i++){
			fecha.setTime(fecha.getTime()+(1000*60*60*24));
			let horarios = this.getHorariosPorServicio(servicio,fecha);
			if(!horarios.length){
				diasNoDisponibles.push(new Date(fecha.getTime()))
			}
		}
		return diasNoDisponibles;
	}
}