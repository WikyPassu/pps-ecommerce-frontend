import React from 'react'
console.log('Producto servicios iniciado');
export default class ProductoService extends React.Component {
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

    static getProductoPorCodigo(codigo){
        return this.productos.filter(c => c.codigo === codigo)[0];
    }

	static addProducto(newItem) {
		this.productos.push(newItem);
		this.notifySubscribers();
	}

	static modifyProducto(item){
		console.log("Modificar producto",item);
		this.productos = this.productos.map((c)=> (c.codigo === item.codigo) ? item : c);
		this.notifySubscribers();
	}

	static removeProducto() {
        console.warn("removeItem esta hardcodeado")
		this.productos.pop();
		this.notifySubscribers();
	}
}