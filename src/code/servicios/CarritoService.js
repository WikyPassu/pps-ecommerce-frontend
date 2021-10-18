console.log("Carrito servicio iniciado");
export default class CarritoService{
	static items_carrito_compras = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.items_carrito_compras);
		})
	}

	static getItems() {
		return this.items_carrito_compras;
	}

	/**
	 * Agrega un item al carrito
	 * @param {*} producto 
	 * @param {*} cantidad 
	 * @param {*} tipoItem producto o servicio
	 */
	static addItem(item,cantidad) {
		console.log("Agregando item")
		this.items_carrito_compras.push({
			id:(new Date()).getTime(),
			item,
			cantidad
		});
		this.notifySubscribers();
	}

	static removeItem(id) {
		this.items_carrito_compras = this.items_carrito_compras.filter((c)=>c.id !== id);
		this.notifySubscribers();
	}

	/**
	 * Devuelve el precio total de todos los items del carrito
	 * @returns 
	 */
	static getTotal(){
		return parseFloat(this.items_carrito_compras.reduce((anterior, actual) => {
			return anterior + (actual.item.precio * actual.cantidad);
		}, 0).toFixed(2));
	}


}