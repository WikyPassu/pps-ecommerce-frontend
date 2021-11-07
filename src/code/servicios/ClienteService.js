import UtilsService from "./UtilsService";
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
			console.log(data);
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
        return this.clientes.filter(c => c.dni === dni)[0];
    }

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN: error 500
	 * @param {*} newItem 
	 */
	static async addCliente(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ usuarioRegistrado: newItem })
			});
			const data = await res.json();
			console.log(data);
			this.clientes.push(newItem);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN error 500
	 * @param {*} item 
	 */
	static async modifyCliente(item){
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, usuarioRegistrado: item })
			});
			const data = await res.json();
			console.log(data);
			item._id = _id;
			this.clientes = this.clientes.map((c)=> (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 *  GUARDAR CAMBIOS EN BACKEND
	 * @todo ALAN inconsistencia de parametros
	 * @param {*} _id ID del objeto
	 */
	 static async removeCliente(_id) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().usuarioRegistrado.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			console.log(data);
			this.clientes = this.clientes.filter((c)=> (c._id !== _id));
			this.notifySubscribers();
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
				body: JSON.stringify({ dniUsuario: dniCliente, idServicio: idServicio})
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
		this.usuario = {
			"_id":"cli02",
			"nombre":"John",
			"apellido":"Smith",
			"dni":323232323,
			"correo":"asdasd@asd2.com",
			"clave":"asdasd123123",
			"domicilio":"fdsfsd 23322",
			"localidad":"San Fco Solano2",
			"telefono":11666699992,
			"codigoPostal":"56652",
			"perrito":[
				{
					"id":"perr02",
					"dniDuenio":323232323,
					"peso":2500,
					"nombre":"firulais2",
					"edad":8,
					"raza":"labrador"
				}
			],
			"estado":"ACTIVO"
		};
		
		return true;
	}

	/**
	 * @todo Contecar con el backend y guardar usuario en las cookies y la DB. Guardar usuario en la variable usuario
	 * @param {*} newUser 
	 * @returns true si el logeo fue exitoso. False en caso contrario
	 */
	static async signUp(newUser){
		this.usuario = newUser;
		return true;
	}
	
	/**
	 * @todo QUE LO VERIFIQUE BUSCANDO SI ESTA EL USUARIO EN LAS COOKIES.
	 * @returns El usuario de cliente o null.
	 */
	static getUsuario(){
		return this.usuario;
	};

	/**
	 * @todo Destruye la cookie de la sesion y recarga la pagina
	 */
	static async cerrarSesion(){
		this.usuario = null;
	}

}