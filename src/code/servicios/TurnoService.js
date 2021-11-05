import samples from "../../samples/turnos.json";
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
	* @todo TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio(){
		console.log('Servicio turnos iniciado');
		this.turnos = samples;

		return samples;
	}


	static getTurnos() {
		return this.turnos;
	}

    static getTurnoPorId(_id){
        return this.turnos.filter(c => c._id === _id)[0];
    }

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addTurno(newItem) {
		this.turnos.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyTurno(item){
		this.turnos = this.turnos.map((c)=> (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static removeTurno(_id) {
		this.turnos = this.turnos.filter((c)=> (c._id !== _id));
		this.notifySubscribers();
	}
}