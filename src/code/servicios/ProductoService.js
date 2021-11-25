import UtilsService from "./UtilsService";
export default class ProductoService {
	static productos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(ProductoService.productos);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.traerTodos);
			const data = await res.json();
			this.productos = data.productos;
			this.notifySubscribers();
			return this.productos;
		} catch (err) {
			console.log(err);
		}
	}


	static getProductos() {
		return this.productos;
	}

	static getProductoPorId(_id) {
		return this.productos.filter(c => c._id === _id)[0];
	}

	/**
 *  PROCESAR BUSQUEDA UTILIZANDO EL BACKEND (Index de MongoDB)
 * 
 * @param {*} busqueda 
 * @returns 
 */
	static async getProductosPorBusqueda(busqueda) {
		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.buscar, {
				method: 'POST',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ busqueda: busqueda }),
			});
			const data = await res.json();
			return data.productos;

		} catch (err) {
			console.log(err);
		}
	}

	/**
	 *  Obtener mas vendido. Si el numero de ventas son iguales, agarrar cualquiera
	 * @returns 
	 */
	static async getMasVendido() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.traerMasVendido);
			const data = await res.json();
			this.notifySubscribers();
			return data.producto;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * Obtener productos ordenados con los productos cargados en el servicio. No usar BACKEND
	 * @todo LUCAS: no se llama desde ningun lado, testear y avisar si funciona o no...
	 * @param {*} tipoOrden MAS_VENDIDOS | MAYOR_PRECIO | MENOR_PRECIO
	 * @returns 
	 */
	static async getProductosOrdenados(tipoOrden) {
		console.info(this.productos);
		switch (tipoOrden) {
			case "MAS_VENDIDOS":
				try {
					const res = await fetch(UtilsService.getUrlsApi().productos.traerMasVendidos);
					const data = await res.json();
					this.productos = data.productos;
					this.notifySubscribers();

					return data.producto;
				} catch (err) {
					console.log(err);
				}
				break;
			case "MAYOR_PRECIO":
				this.productos = this.productos.sort((prodUno, prodDos) => {
					if (prodUno.precio > prodDos.precio) {
						return 1;
					}
					if (prodUno.precio < prodDos.precio) {
						return -1;
					}
					return 0
				});
				break;
			case "MENOR_PRECIO":
				this.productos = this.productos.sort((prodUno, prodDos) => {
					if (prodUno.precio > prodDos.precio) {
						return -1;
					}
					if (prodUno.precio < prodDos.precio) {
						return 1;
					}
					return 0
				});
				break;
			default:
				console.error("ERROR: codigo inalcanzable");
				break;
		}
		console.info(this.productos);
		return this.productos;
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 */
	static async addProducto(newItem) {
		UtilsService.setLoading(true);
		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ producto: newItem })
			});
			const data = await res.json();
			if (data.status === 200) {
				this.productos.push(newItem);
				this.iniciarServicio();
			}
			else {
				console.log(data);
				alert("Error. No se pudo agregar el producto");
			}
		} catch (err) {
			console.log(err);
		}
		finally {
			UtilsService.setLoading(false);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyProducto(item) {
		let _id = JSON.parse(JSON.stringify(item))._id;
		delete item._id;

		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, producto: item })
			});
			const data = await res.json();
			if (data.status === 200) {
				this.productos = this.productos.map((c) => (c._id === item._id) ? item : c);
				this.iniciarServicio();
			}
			else {
				console.log(data);
				alert("Error al modificar el producto");
			}

		} catch (err) {
			console.log(err);
			alert("Error. No pudo eliminar el producto");
		}
		
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} _id ID del objeto
	 */
	static async removeProducto(_id) {
		UtilsService.setLoading(true);
		try {
			const res = await fetch(UtilsService.getUrlsApi().productos.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			const data = await res.json();
			if (data.status === 200) {
				this.productos = this.productos.filter((c) => (c._id !== _id));
				this.notifySubscribers();
			}
			else {
				console.error(data);
				alert("Error. No pudo eliminar el producto");
			}
		} catch (err) {
			console.log(err);
			alert("Error. No pudo eliminar el producto");
		}
		finally {
			UtilsService.setLoading(false);
		}
	}


}