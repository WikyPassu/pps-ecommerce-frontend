console.log('Servicio turnos iniciado');
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
	static getTurnos() {
		return this.turnos;
	}

    static getTurnoPorId(id){
        return this.turnos.filter(c => c.id === id)[0];
    }

	static addTurno(newItem) {
		this.turnos.push(newItem);
		this.notifySubscribers();
	}

	static modifyTurno(item){
		this.turnos = this.turnos.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	static removeTurno(id) {
		this.turnos = this.turnos.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}