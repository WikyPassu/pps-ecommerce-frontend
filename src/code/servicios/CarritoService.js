import React from 'react'
console.log("Carrito servicio iniciado");
export default class CarritoService extends React.Component {
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

	static addItem(newItem) {
		this.items_carrito_compras.push(newItem);
		this.notifySubscribers();
	}

	static removeItem() {
		this.items_carrito_compras.pop();
		this.notifySubscribers();
	}

	static getTotal(){
		return this.items_carrito_compras.reduce((anterior, actual) => {
			return anterior + actual.precio;
		}, 0);
	}


}