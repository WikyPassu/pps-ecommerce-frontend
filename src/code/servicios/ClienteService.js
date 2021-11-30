import UtilsService from "./UtilsService";
import Cookies from "universal-cookie/es6";

export default class ClienteService{
	static clientes = [];
	static observers = [];
	static usuario = null;
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.clientes);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	 * TRAER OBJETOS DEL BACKEND.
	 * @returns Array de servicios
	 */
	static async iniciarServicio(){
		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.traerTodos);
			const data = await res.json();
			this.clientes = data.usuariosRegistrados;
			this.notifySubscribers();
			return this.clientes;
		} catch (err) {
			console.log(err);
		}
		return this.clientes;
	}



	static getClientes() {
		return this.clientes;
	}

    static getClienteById(_id){
        return this.clientes.filter(c => c._id === _id)[0];
    }

	static getClienteByDNI(dni){
		// eslint-disable-next-line
        return this.clientes.filter(c => c.dni == dni)[0];
    }

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addCliente(newItem) {
		try {
			await fetch(UtilsService.getUrlsApi().usuarioRegistrado.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ usuarioRegistrado: newItem })
			});
			this.clientes.push(newItem);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyCliente(item){
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			await fetch(UtilsService.getUrlsApi().usuarioRegistrado.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, usuarioRegistrado: item })
			});
			//await res.json();
			item._id = _id;
			this.clientes = this.clientes.map((c)=> (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 *  GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	 static async removeCliente(_id) {
		try {
			await fetch(UtilsService.getUrlsApi().usuarioRegistrado.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			this.clientes = this.clientes.filter((c)=> (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * Se verifica que el cliente haya -comprado el producto que se muestra en pagina de un producto- ADQUIRIDO EL SERVICIO para poder habilitar las reseñas.
	 * @todo CONECTAR CON EL BACKEND o en su defecto hacerlo con los objetos guardados en el servicio.
	 * @param {*} dniCliente NEW 
	 * @param {*} idServicio 
	 * @returns 
	 */
	static async isDisponibleParaResenia(dniCliente, idServicio){
		try {
			const res = await fetch(UtilsService.getUrlsApi().resenia.verificarCompraPrevia, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ dniCliente: dniCliente, idServicio: idServicio})
			});
			const data = await res.json();
			return data.exito;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @todo Contecar con el backend y guardar usuario en las cookies. Guardar usuario en la variable usuario
	 * @param {*} correo 
	 * @param {*} clave 
	 * @returns true si el logeo fue exitoso. False en caso contrario
	 */
	static async login(correo, clave){
		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.login, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ correo: correo, clave: clave })
			});
			const data = await res.json();
			if(data.usuario){
				this.usuario = data.usuario;
				const cookies = new Cookies();
				cookies.set("usuario", data.usuario);
				return true;
			}
			Promise.reject();
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
	static async signUp(newUser){
		try {
			await this.addCliente(newUser);
			return this.login(newUser.correo,newUser.clave);
		} catch (err) {
			console.log(err);
			Promise.reject(true);
		}
	}
	
	/**
	 * @todo QUE LO VERIFIQUE BUSCANDO SI ESTA EL USUARIO EN LAS COOKIES.
	 * @returns El usuario de cliente o null.
	 */
	static getUsuario(){
		if(!this.usuario){
			const cookies = new Cookies();
			const usuario = cookies.get("usuario");
			this.usuario = usuario;
		}
		return this.usuario;
	};

	/**
	 * @todo Destruye la cookie de la sesion y recarga la pagina
	 */
	static cerrarSesion(){
		const cookies = new Cookies();
		cookies.remove("usuario");
		this.usuario = null;
	}

}