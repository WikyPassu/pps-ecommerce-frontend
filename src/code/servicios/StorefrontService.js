import samples from "../../samples/storefront.json";
console.log('Configuracion Frontend servicios iniciado');

export default class StorefrontService {
	static configuracion = {
		"ordenListadoProductos": "MAYOR_PRECIO",
		"ordenListadoServicios": "MAYOR_PRECIO"
	};
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.state.observers.forEach((current) => {
			current(this.imagenesCarrusel);
		})
	}
	
	static async iniciarServicio() {
		console.log('Servicio Storefront iniciado');
		this.configuracion = samples[0];//SOLO DEBE HACER UN SOLO OBJETO DE CONFIGURACION
		return samples;
	}


	/**
	 * @todo Registrar cambios en el backend
	 * 
	 * @todo ALAN : avisame cuando hagas la peti
	 * @param {*} ordenamiento MAS_VENDIDOS | MAYOR_PRECIO | MENOR_PRECIO
	 */
	static setOrdenListadoProductos(ordenamiento) {
		if(ordenamiento === "MAS_VENDIDOS" && ordenamiento === "MAYOR_PRECIO" && ordenamiento === "MENOR_PRECIO"){
			this.ordenListadoProductos = ordenamiento;
		}
	}

	static getOrdenListaProductos() {
		return this.configuracion.ordenListadoProductos;
	}

	/**
 	* @todo Registrar cambios en el backend
	  * @todo ALAN : avisame cuando hagas la peti
 	* @param {*} ordenamiento MAS_VENDIDOS | MAYOR_PRECIO | MENOR_PRECIO
 	*/
	static setOrdenListadoServicios(ordenamiento) {
		if(ordenamiento === "MAS_VENDIDOS" && ordenamiento === "MAYOR_PRECIO" && ordenamiento === "MENOR_PRECIO"){
			this.ordenListadoServicios = ordenamiento;
		}
	}

	static getOrdenListaServicios() {
		return this.configuracion.ordenListadoServicios;
	}


}