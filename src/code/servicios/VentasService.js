import React from 'react'
console.log('Producto Facturas iniciado');
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
	static getFacturas() {
		return this.facturas;
	}

    static getFacturaPorId(id){
        return this.facturas.filter(c => c.id === id)[0];
    }

	static addFactura(newItem) {
		this.facturas.push(newItem);
		this.notifySubscribers();
	}

	static modifyFactura(item){
		console.warn("Modificar Factura",item);
		this.facturas = this.facturas.map((c)=> (c.numero === item.numero) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	static removeFactura(id) {
		this.facturas = this.facturas.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}
}