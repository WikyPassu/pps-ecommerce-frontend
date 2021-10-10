import React from 'react'
console.log('Producto Facturas iniciado');
export default class FacturasService extends React.Component {
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

    static getFacturaPorNumero(numero){
        return this.facturas.filter(c => c.numero === numero)[0];
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

	static removeFactura() {
        console.warn("removeItem esta hardcodeado")
		this.facturas.pop();
		this.notifySubscribers();
	}
}