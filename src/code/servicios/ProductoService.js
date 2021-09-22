import React from 'react'
console.log('Producto servicios iniciado');
export default class ProductoService extends React.Component {
	static productos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.state.observers.forEach((current) => {
			current(this.items_carrito_compras);
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

	static removeProducto() {
        console.warn("removeItem esta hardcodeado")
		this.productos.pop();
		this.notifySubscribers();
	}


}