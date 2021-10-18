console.log("Servicio cliente iniciado");
export default class ClienteService{
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

    static getClienteById(id){
        return this.clientes.filter(c => c.id === id)[0];
    }

	static getClienteByDNI(dni){
        return this.clientes.filter(c => c.dni == dni)[0];
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

	/**
	 * @param {*} id ID del objeto
	 */
	 static removeCliente(id) {
		this.clientes = this.clientes.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}

	static isDisponibleParaResenia(idCliente, idProducto){
		return false;
	}

}