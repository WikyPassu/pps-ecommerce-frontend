import UtilsService from "./UtilsService";
import Cookies from "universal-cookie/es6";

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
	  * TRAER OBJETOS DEL BACKEND.
	  * @returns Array de objetos
	  */
	static async iniciarServicio() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().empleado.traerTodos);
			const data = await res.json();
			console.log(data);
			this.empleados = data.empleados;
			this.notifySubscribers();
			return this.empleados;
		} catch (err) {
			console.log(err);
		}
	}


	static getEmpleados() {
		return this.empleados;
	}

	static getEmpleadoById(_id) {
		return this.empleados.filter(c => c._id === _id)[0];
	}

	static getEmpleadoByDNI(dni) {
		// eslint-disable-next-line
		return this.empleados.filter(c => c.dni == dni)[0];
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: no actualiza la parte visual
	 * @param {*} newItem 
	 */
	static async addEmpleado(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().empleado.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ empleado: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.empleados.push(data.empleado);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyEmpleado(item) {
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;
		console.log(_id);
		console.log(item);
		try {
			const res = await fetch(UtilsService.getUrlsApi().empleado.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, empleado: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.empleados = this.empleados.map((c) => (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
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

		try {
			const res = await fetch(UtilsService.getUrlsApi().empleado.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.info(data);
			this.empleados = this.empleados.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
 * @todo Verificar el usuario logeado con el backend y guardar usuario en las cookies.  Guardar usuario en la variable usuario
 * @param {*} correo 
 * @param {*} clave 
 * @returns 
 */
	static async login(correo, clave) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.login, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ correo: correo, clave: clave })
			});
			const data = await res.json();
			console.log(data);
			this.usuario = data.empleado;
			const cookies = new Cookies();
			cookies.set("usuario", data.empleado);
			Promise.resolve(data.exito);
		} catch (err) {
			console.log(err);
			Promise.reject(err);
		}
	}


	/**
	 * @todo Contecar con el backend y guardar usuario en las cookies y la DB. Guardar usuario en la variable usuario
	 * @param {*} newUser 
	 * @returns true si el logeo fue exitoso. False en caso contrario
	 */
	static async signUp(newUser) {
		try {
			await this.addEmpleado(newUser);
			return this.login(newUser.correo,newUser.clave);
		} catch (err) {
			console.log(err);
			Promise.reject(true);
		}
	}

	/**
	 * @todo QUE LO VERIFIQUE BUSCANDO SI ESTA EL USUARIO EN LAS COOKIES.
	 * @returns El usuario de empelado o null.
	 */
	static getUsuario() {
		const cookies = new Cookies();
		const usuario = cookies.get("usuario");
		if(usuario){
			return usuario;
		}
		return null;
	};

	/**
	  * @todo Destruye la cookie de la sesion y recarga la pagina
	  */
	static async cerrarSesion() {
		const cookies = new Cookies();
		cookies.remove("usuario");
		this.usuario = null;
	}

}