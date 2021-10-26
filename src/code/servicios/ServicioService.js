console.log('Servicio servicios iniciado');
export default class ServicioService{
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
	static getServicios() {
		return this.servicios;
	}

    static getServicioPorId(id){
        return this.servicios.filter(c => c.id === id)[0];
    }

	static addServicio(newItem) {
		this.servicios.push(newItem);
		this.notifySubscribers();
	}

	static modifyServicio(item){
		this.servicios = this.servicios.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	static removeServicio(id) {
		this.servicios = this.servicios.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}