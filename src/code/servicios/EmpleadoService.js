console.log("Servicio empelado iniciado");
export default class EmpleadoService{
	static empleados = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.empleados);
		})
	}
	static getEmpleados() {
		return this.empleados;
	}

    static getEmpleadoById(id){
        return this.empleados.filter(c => c.id === id)[0];
    }

	static getEmpleadoByDNI(dni){
        return this.empleados.filter(c => c.dni == dni)[0];
    }

	static addEmpleado(newItem) {
		this.empleados.push(newItem);
		this.notifySubscribers();
	}

	static modifyEmpleado(item){
		this.empleados = this.empleados.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @param {*} id ID del objeto
	 */
	 static removeEmpleado(id) {
		let empleadoToRemove = this.getEmpleadoById(id);
		if(empleadoToRemove.tipo == "ADMINISTRADOR"){
			let cantidadAministradores = this.empleados.filter((c)=> (c.tipo === "ADMINISTRADOR")).length;
			if(cantidadAministradores == 1){
				alert("No puede eliminarse a un usuario ADMINISTRADOR si solo queda uno en el sistema");
				return;
			}
		}
		this.empleados = this.empleados.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}

}