console.log('Servicio consumibles iniciado');
export default class ConsumibleService{
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
	static getConsumibles() {
		return this.consumibles;
	}

    static getConsumiblePorId(id){
        return this.consumibles.filter(c => c.id == id)[0];
    }

	static addConsumible(newItem) {
		this.consumibles.push(newItem);
		this.notifySubscribers();
	}

	static modifyConsumible(item){
		this.consumibles = this.consumibles.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	static removeConsumible(id) {
		this.consumibles = this.consumibles.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}