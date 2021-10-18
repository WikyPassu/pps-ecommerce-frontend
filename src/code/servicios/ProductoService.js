console.log('Producto servicios iniciado');
export default class ProductoService{
	static productos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.productos);
		})
	}
	static getProductos() {
		return this.productos;
	}

    static getProductoPorId(id){
        return this.productos.filter(c => c.id === id)[0];
    }

	static addProducto(newItem) {
		this.productos.push(newItem);
		this.notifySubscribers();
	}

	static modifyProducto(item){
		console.log("Modificar producto",item);
		this.productos = this.productos.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	static removeProducto(id) {
		this.productos = this.productos.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}