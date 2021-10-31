import samples from "../../samples/empleados.json";
export default class EmpleadoService {
	static empleados = [];
	static observers = [];
	static usuario = null;
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.empleados);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	  * @todo TRAER OBJETOS DEL BACKEND.
	  * @returns Array de objetos
	  */
	static async iniciarServicio() {
		console.log("Servicio empelado iniciado");
		this.empleados = samples;

		return samples;
	}


	static getEmpleados() {
		return this.empleados;
	}

	static getEmpleadoById(id) {
		return this.empleados.filter(c => c.id === id)[0];
	}

	static getEmpleadoByDNI(dni) {
		return this.empleados.filter(c => c.dni === dni)[0];
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addEmpleado(newItem) {
		this.empleados.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyEmpleado(item) {
		this.empleados = this.empleados.map((c) => (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	static removeEmpleado(id) {
		let empleadoToRemove = this.getEmpleadoById(id);
		if (empleadoToRemove.tipo === "ADMINISTRADOR") {
			let cantidadAministradores = this.empleados.filter((c) => (c.tipo === "ADMINISTRADOR")).length;
			if (cantidadAministradores === 1) {
				alert("No puede eliminarse a un usuario ADMINISTRADOR si solo queda uno en el sistema");
				return;
			}
		}
		this.empleados = this.empleados.filter((c) => (c.id !== id));
		this.notifySubscribers();
	}

	/**
 * @todo Verificar el usuario logeado con el backend y guardar usuario en las cookies.  Guardar usuario en la variable usuario
 * @param {*} correo 
 * @param {*} clave 
 * @returns 
 */
	static login(correo, clave) {
		return true;
	}

	/**
	 * @todo QUE LO VERIFIQUE BUSCANDO SI ESTA EL USUARIO EN LAS COOKIES.
	 * @returns 
	 */
	static isLogged() {
		return true;
	}

	/**
	  * @todo Destruye la cookie de la sesion y recarga la pagina
	  */
	static cerrarSesion() {

	}

}