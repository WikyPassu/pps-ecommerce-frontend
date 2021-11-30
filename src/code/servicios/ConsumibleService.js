import UtilsService from "./UtilsService";
export default class ConsumibleService {
	static consumibles = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.consumibles);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
 	* TRAER OBJETOS DEL BACKEND.
 	* @returns Array de consumibles
 	*/
	 static async iniciarServicio(){
		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.traerTodos);
			const data = await res.json();
			this.consumibles = data.consumibles;
			this.notifySubscribers();
			return this.consumibles;
		} catch (err) {
			console.log(err);
		}
	}

	static getConsumibles() {
		return this.consumibles;
	}

	static getConsumiblePorId(_id) {
		return this.consumibles.filter(c => c._id === _id)[0];
	}

	static getConsumiblePorNombre(nombre) {
		return this.consumibles.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
	}

	/**
	 * Calcula los consumibles en funcion del peso del perrito.
	 * @param {*} perrito 
	 * @returns Array de los  consumibles calculados
	 */
	 static calcularConsumibles(perrito,categoria) {
		if(categoria === "banio"){
			// Se gastara un shampoo cada 5000 gramos de perro
			let consumible = ConsumibleService.getConsumiblePorNombre("shampoo");
			let cantidadConsumibleUtilizar = perrito.peso * 1 / 5000;
			return  [{
                "cantidad":cantidadConsumibleUtilizar,
                "consumible":{
                    "_id":consumible._id,
                    "nombre":consumible.nombre,
                    "existencia":consumible.existencia,
                    "existenciaMinima":consumible.existenciaMinima,
                    "precioUnidad":consumible.precioUnidad
                }
            }]
		}
		else if(categoria === "guarderia"){
			
		}
		else if(categoria === "corte_de_cabello"){

		}
		else if(categoria === "traslado"){

		}
		// <option value="banio">Baño</option>
		// <option value="guarderia">Guarderia</option>
		// <option value="corte_de_cabello">Corte de Cabello</option>
		// <option value="traslado">Traslado</option>

		return [];
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addConsumible(newItem) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().consumible.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ consumible: newItem })
			});
			const data = await res.json();
			this.consumibles.push(data.consumible);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyConsumible(item) {
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			await fetch(UtilsService.getUrlsApi().consumible.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, consumible: item })
			});
			item._id = _id;
			this.consumibles = this.consumibles.map((c) => (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeConsumible(_id) {
		try {
			await fetch(UtilsService.getUrlsApi().consumible.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			this.consumibles = this.consumibles.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} idConsumible 
	 * @param {*} cantidadUsada 
	 */
	static async registrarConsumibleUsado(idConsumible, cantidadUsada){
		//Basicamente es un modify consumible pero mas amigable
		try {
			await fetch(UtilsService.getUrlsApi().consumible.actualizar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: idConsumible, cantidadUsada })
			});
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}
}