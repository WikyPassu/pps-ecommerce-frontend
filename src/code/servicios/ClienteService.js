import React from 'react'
console.log("Cliente servicio iniciado");
export default class ClienteService extends React.Component {
	static clientes = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.clientes);
		})
	}
	static getClientes() {
		return this.clientes;
	}

    static getClienteId(id){
        return this.clientes.filter(c => c.id === id)[0];
    }

	static addCliente(newItem) {
		this.clientes.push(newItem);
		this.notifySubscribers();
	}

	static modifyCliente(item){
		console.log("Modificar item",item);
		this.clientes = this.clientes.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	static removeCliente() {
        console.warn("removeItem esta hardcodeado")
		this.clientes.pop();
		this.notifySubscribers();
	}

	static isDisponibleParaResenia(idCliente, idProducto){
		return false;
	}

}