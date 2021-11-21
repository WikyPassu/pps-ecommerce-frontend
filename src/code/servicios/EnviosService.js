import precioEnviosSample from "../../samples/precioEnvios.json"
import UtilsService from "./UtilsService";
export default class EnviosService {
	static precioEnvios = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static async iniciarServicio() {
		console.log("Servicio Envios iniciado");
        try {
			const res = await fetch(UtilsService.getUrlsApi().precioEnvios.traerTodos);
			const data = await res.json();
			console.log(data);
			this.precioEnvios = data.precioEnvioss;
			console.log("PRECIO ENVIOS",this.precioEnvios);
			this.notifySubscribers();
			return this.precioEnvios;
		} catch (err) {
			console.log(err);
		}
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.precioEnvios);
		})
	}

	static async addPrecioEnvios(newPrecioEnvio) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().precioEnvios.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ precioEnvios: newPrecioEnvio })
			});
			const data = await res.json();
			this.precioEnvios.push(data.newPrecioEnvio);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	static async modifyPrecioEnvios(precioEnvio) {
		const _id = JSON.parse(JSON.stringify(precioEnvio))._id;
        delete precioEnvio._id;
        try {
			await fetch(UtilsService.getUrlsApi().precioEnvios.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, precioEnvios: precioEnvio })
			});
			precioEnvio._id = _id;
			this.precioEnvios = this.precioEnvios.map((c) => (c._id === precioEnvio._id) ? precioEnvio : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	static getPrecioEnvios() {
        return this.precioEnvios;
	}

	static async removePrecioEnvios(_id) {
        try {
			await fetch(UtilsService.getUrlsApi().precioEnvios.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			this.precioEnvios = this.precioEnvios.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}

	}

    static getPrecioPorLocalidad(localidad){
        let precio = precioEnviosSample.find((c) => {
            return c.localidad === localidad;
        })?.precio;
        //Si no se encuentra el precio de la localidad. Se usara el precio default
        if (!precio) {
            precio = precioEnviosSample.find((c) => {
                return c.localidad === "*";
            })?.precio;
        }
        return precio;
    }
}