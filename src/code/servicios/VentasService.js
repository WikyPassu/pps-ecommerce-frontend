import samples from "../../samples/facturas.json";
export default class FacturasService{
	static facturas = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.facturas);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* @todo TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio(){
		console.log('Servicio Facturas iniciado');
		this.facturas = samples;

		return samples;
	}

	static getFacturas() {
		return this.facturas;
	}

    static getFacturaPorId(id){
        return this.facturas.filter(c => c.id === id)[0];
    }

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addFactura(newItem) {
		this.facturas.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyFactura(item){
		this.facturas = this.facturas.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	static removeFactura(id) {
		this.facturas = this.facturas.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}