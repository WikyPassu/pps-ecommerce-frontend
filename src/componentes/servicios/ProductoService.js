import React from 'react'
export default class ProductoService extends React.Component {
	static productos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static getProductos() {
		return this.productos;
	}

    static getProductoPorCodigo(codigo){
        return this.productos.filter(c => c.codigo == codigo)[0];
    }

	static agregarProducto(newItem) {
		this.productos.push(newItem);
		this.notifySubscribers();
	}

	static removeItem() {
        console.warn("removeItem esta hardcodeado")
		this.productos.pop();
		this.notifySubscribers();
	}

	static notifySubscribers() {
		this.state.observers.forEach((current) => {
			current(this.items_carrito_compras);
		})
	}
}