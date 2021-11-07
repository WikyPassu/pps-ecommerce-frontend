import samples from "../../samples/consumibles.json";
import UtilsService from "./UtilsService";
export default class ConsumibleService {
	static consumibles = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.consumibles);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
 	* TRAER OBJETOS DEL BACKEND.
 	* @returns Array de consumibles
 	*/
	 static async iniciarServicio(){
		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.traerTodos);
			const data = await res.json();
			console.log(data);
			this.consumibles = data.consumibles;
			this.notifySubscribers();
			return this.consumibles;
		} catch (err) {
			console.log(err);
		}
	}

	static getConsumibles() {
		return this.consumibles;
	}

	static getConsumiblePorId(_id) {
		return this.consumibles.filter(c => c._id === _id)[0];
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: error 500
	 * @param {*} newItem 
	 */
	static async addConsumible(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ consumible: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.consumibles.push(newItem);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: error 500
	 * @param {*} item 
	 */
	static async modifyConsumible(item) {
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, consumible: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.consumibles = this.consumibles.map((c) => (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: error 500
	 * @param {*} _id ID del objeto
	 */
	static async removeConsumible(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.log(data);
			this.consumibles = this.consumibles.filter((c) => (c._id !== _id));
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: crear peticion
	 * @param {*} idConsumible 
	 * @param {*} cantidadUsada 
	 */
	static async registrarConsumibleUsado(idConsumible, cantidadUsada){
		//Basicamente es un modify consumible pero mas amigable
	}
}