import samples from "../../samples/turnos.json";
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
	 * @todo GUARDAR CAMBIOS EN BACKEND
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
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyTurno(item){
		this.turnos = this.turnos.map((c)=> (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeTurno(_id) {
		this.turnos = this.turnos.filter((c)=> (c._id !== _id));
		this.notifySubscribers();
	}
}