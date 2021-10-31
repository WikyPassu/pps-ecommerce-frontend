import samples from "../../samples/consumibles.json";
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
 	* @todo TRAER OBJETOS DEL BACKEND.
 	* @returns Array de consumibles
 	*/
	 static async iniciarServicio(){
		console.log('Servicio consumibles iniciado');
		this.consumibles = samples;

		return samples;
	}

	static getConsumibles() {
		return this.consumibles;
	}

	static getConsumiblePorId(id) {
		return this.consumibles.filter(c => c.id === id)[0];
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addConsumible(newItem) {
		this.consumibles.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyConsumible(item) {
		this.consumibles = this.consumibles.map((c) => (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	static removeConsumible(id) {
		this.consumibles = this.consumibles.filter((c) => (c.id !== id));
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} idConsumible 
	 * @param {*} cantidadUsada 
	 */
	static registrarConsumibleUsado(idConsumible, cantidadUsada){
		//Basicamente es un modify consumible pero mas amigable
	}
}