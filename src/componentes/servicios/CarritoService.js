import React, { useState } from 'react'
export default class CarritoService extends React.Component {
	static items_carrito_compras = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
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

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.items_carrito_compras);
		})
	}
}