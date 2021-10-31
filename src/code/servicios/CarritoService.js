export default class CarritoService{
	static items_carrito_compras = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	 * @todo OBTENER ARRAY DE ITEMS DESDE LA COOKIES.
	 * @returns Array de items del carrito guardado en las cookies. Si no existe, devuelve array vacio.
	 */
	static async iniciarServicio(){
		console.log("Carrito servicio iniciado");
		return [];
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
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} producto 
	 * @param {*} cantidad 
	 * @param {*} tipoItem Producto
	 * 
	 */
	static addItem(item,cantidad = 1) {
		console.log("Agregando item")
		this.items_carrito_compras.push({
			id: (new Date()).getTime(),
			item,
			cantidad
		});

		this.notifySubscribers();
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} id 
	 */
	static removeItem(id) {
		this.items_carrito_compras = this.items_carrito_compras.filter((c)=>c.id !== id);
		this.notifySubscribers();
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} precio 
	 */
	static addEnvios(precio) {
		console.log("Agregando item")
		let existeEnvio = this.items_carrito_compras.filter(i => i.id === "envios")[0];
		if(existeEnvio == null){
			this.items_carrito_compras.push({
				id: "envios",
				item:{
					precio:precio,
					nombre:"Servicio de Envios"
				},
				cantidad:1
			});
			this.notifySubscribers();
		}
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 */
	static removeEnvios(){
		this.items_carrito_compras = this.items_carrito_compras.filter((c)=>c.id !== "envios");
		this.notifySubscribers();
	}

	/**
	 * @returns El precio total de todos los items del carrito
	 */
	static getTotal(){
		return parseFloat(this.items_carrito_compras.reduce((anterior, actual) => {
			return anterior + (actual.item.precio * actual.cantidad);
		}, 0).toFixed(2));
	}


}