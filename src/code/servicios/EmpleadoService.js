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

	static getEmpleadoById(_id) {
		return this.empleados.filter(c => c._id === _id)[0];
	}

	static getEmpleadoByDNI(dni) {
		return this.empleados.filter(c => c.dni === dni)[0];
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addEmpleado(newItem) {
		this.empleados.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyEmpleado(item) {
		this.empleados = this.empleados.map((c) => (c._id === item._id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeEmpleado(_id) {
		let empleadoToRemove = this.getEmpleadoById(_id);
		if (empleadoToRemove.tipo === "ADMINISTRADOR") {
			let cantidadAministradores = this.empleados.filter((c) => (c.tipo === "ADMINISTRADOR")).length;
			if (cantidadAministradores === 1) {
				alert("No puede eliminarse a un usuario ADMINISTRADOR si solo queda uno en el sistema");
				return;
			}
		}
		this.empleados = this.empleados.filter((c) => (c._id !== _id));
		this.notifySubscribers();
	}

	/**
 * @todo Verificar el usuario logeado con el backend y guardar usuario en las cookies.  Guardar usuario en la variable usuario
 * @param {*} correo 
 * @param {*} clave 
 * @returns 
 */
	static async login(correo, clave) {
		return true;
	}


	/**
	 * @todo Contecar con el backend y guardar usuario en las cookies y la DB. Guardar usuario en la variable usuario
	 * @param {*} newUser 
	 * @returns true si el logeo fue exitoso. False en caso contrario
	 */
	static async signUp(newUser) {
		this.usuario = newUser;
		return true;
	}

	/**
	 * @todo QUE LO VERIFIQUE BUSCANDO SI ESTA EL USUARIO EN LAS COOKIES.
	 * @returns El usuario de empelado o null.
	 */
	static getUsuario() {
		return this.usuario;
	};

	/**
	  * @todo Destruye la cookie de la sesion y recarga la pagina
	  */
	static async cerrarSesion() {
		this.usuario = null;

	}

}