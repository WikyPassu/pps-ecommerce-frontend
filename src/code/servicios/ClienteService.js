import samples from "../../samples/clientes.json";
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
	 * @todo TRAER OBJETOS DEL BACKEND.
	 * @returns Array de servicios
	 */
	static async iniciarServicio(){
		console.log("Servicio cliente iniciado");
		this.clientes = samples;
		return samples;
	}



	static getClientes() {
		return this.clientes;
	}

    static getClienteById(id){
        return this.clientes.filter(c => c.id === id)[0];
    }

	static getClienteByDNI(dni){
        return this.clientes.filter(c => c.dni === dni)[0];
    }

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static addCliente(newItem) {
		this.clientes.push(newItem);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static modifyCliente(item){
		console.log("Modificar item",item);
		this.clientes = this.clientes.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	/**
	 * @todo GUARDAR CAMBIOS EN BACKEND
	 * @param {*} id ID del objeto
	 */
	 static removeCliente(id) {
		this.clientes = this.clientes.filter((c)=> (c.id !== id));
		this.notifySubscribers();
	}

	/**
	 * Se verifica que el cliente haya comprado el producto que se muestra en pagina de un producto para poder habilitar las reseñas.
	 * @todo CONECTAR CON EL BACKEND o en su defecto hacerlo con los objetos guardados en el servicio.
	 * @param {*} idCliente 
	 * @param {*} idProducto 
	 * @returns 
	 */
	static isDisponibleParaResenia(idCliente, idProducto){
		return true;
	}

	/**
	 * @todo Contecar con el backend y guardar usuario en las cookies. Guardar usuario en la variable usuario
	 * @param {*} correo 
	 * @param {*} clave 
	 * @returns true si el logeo fue exitoso. False en caso contrario
	 */
	static async login(correo, clave){
		this.usuario = {
			"id":"cli02",
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