import ConsumibleService from "./ConsumibleService";
import UtilsService from "./UtilsService";
export default class TurnoService {
	static turnos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.turnos);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	*  TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.traerTodos);
			const data = await res.json();
			console.log(data);
			if (data.exito) {
				this.turnos = data.turnos.sort((a,b)=>{
					let dateA = new Date(a.fecha).getTime();
					let dateB = new Date(b.fecha).getTime();
					if(dateA > dateB){
						return 1
					}
					else if(dateA < dateB){
						return -1
					}
					return 0;
				});
				this.notifySubscribers();
			}
			return this.turnos;
		} catch (err) {
			console.log(err);
		}

		return this.turnos;
	}


	static getTurnos() {
		return this.turnos;
	}

	/**
	 * @todo LUCAS: inconsistencia, alan lo hace por dni -> alan lo cambio por _id
	 * @param {*} _id 
	 * @returns 
	 */
	static async getTurnoPorId(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.traerTodosIdUsuario, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id })
			});
			const data = await res.json();
			console.log(data);
			if (data.exito) {
				return data.turnos[0];
			}
			return [];
		} catch (err) {
			console.log(err);
		}
	}

	static getTurnosPorDni(dni) {
		// eslint-disable-next-line
		return this.turnos.filter((c)=>c.dniCliente == dni)
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: no se guardan los dnis del empleado ni del cliente, creo que lo dejaste sin terminar
	 * @param {*} newItem 
	 */
	static async addTurno(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ turno: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.turnos.push(newItem);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyTurno(item, descontarStockConsumibles = false) {
		console.log("TURNO A MODIFICAR: ", item, descontarStockConsumibles)
		let _id = JSON.parse(JSON.stringify(item))._id;
		delete item._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, turno: item })
			});
			const data = await res.json();
			if (data.exito) {
				if (descontarStockConsumibles) {
					item.consumibles.forEach(async (c) => {
						await ConsumibleService.registrarConsumibleUsado(c.consumible._id, c.cantidad);
					})
				}
				console.log(data);
				item._id = _id;
				this.turnos = this.turnos.map((c) => (c._id === _id) ? item : c);
			}
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @todo ALAN: tira error de id no encontrado
	 * @param {*} _id ID del objeto
	 */
	static async removeTurno(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.log(data);
			this.turnos = this.turnos.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}
}