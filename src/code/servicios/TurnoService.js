import UtilsService from "./UtilsService";
export default class TurnoService{
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
	static async iniciarServicio(){
		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.traerTodos);
			const data = await res.json();
			console.log(data);
			this.turnos = data.turnos;
			this.notifySubscribers();
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
	 * @todo LUCAS: inconsistencia, alan lo hace por dni
	 * @param {*} _id 
	 * @returns 
	 */
    static getTurnoPorId(_id){
        return this.turnos.filter(c => c._id === _id)[0];
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
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyTurno(item){
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().turno.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, producto: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.turnos = this.turnos.map((c)=> (c._id === _id) ? item : c);
			this.notifySubscribers();
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
			this.turnos = this.turnos.filter((c)=> (c._id !== _id));
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}
}