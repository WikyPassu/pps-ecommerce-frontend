import Cookies from "universal-cookie/es6";
import ClienteService from "./ClienteService";
import ProductoService from "./ProductoService";
import EnviosService from "./EnviosService";
export default class CarritoService {
	static items_carrito_compras = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	 * @todo OBTENER ARRAY DE ITEMS DESDE LA COOKIES.
	 * @returns Array de items del carrito guardado en las cookies. Si no existe, devuelve array vacio.
	 */
	static async iniciarServicio() {
		const cookies = new Cookies();
		let items = cookies.get("items",{path:"/"});
		if (!items) {
			cookies.set("items", [],{path:"/"});
			return [];
		}
		else {
			items.forEach(item => this.items_carrito_compras.push(item));
			this.notifySubscribers();
			return items;
		}
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.items_carrito_compras);
		})
	}

	static getItems() {
		return this.items_carrito_compras;
	}

	/**
	 * Agrega un item al carrito
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} item 
	 * @param {*} cantidad
	 * 
	 */
	static addItem(item, cantidad = 1) {
		let unItem = {
			_id: (new Date()).getTime(),
			item,
			cantidad: parseInt(cantidad)
		};
		let itemExiste = this.items_carrito_compras.find((c)=>c.item._id === item._id);
		if(itemExiste){
			for(const key in itemExiste){
				if(key === "cantidad"){
					itemExiste[key] += cantidad;
				}
			}
		}
		else{
			this.items_carrito_compras.push(unItem);
			alert("Producto agregado!");
		}
		this.notifySubscribers();
		const cookies = new Cookies();
		let items = cookies.get("items",{path:"/"});
		items.push(unItem);
		cookies.set("items", items,{path:"/"});
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} _id 
	 */
	static removeItem(_id) {
		this.items_carrito_compras = this.items_carrito_compras.filter(c => c._id !== _id);
		this.notifySubscribers();
		const cookies = new Cookies();
		let items = cookies.get("items",{path:"/"});
		items = items.filter(item => item._id !== _id);
		cookies.set("items", items,{path:"/"});
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 * @param {*} precio 
	 */
	static addEnvios() {
		let existeEnvio = this.items_carrito_compras.filter(i => i._id === "envios")[0];
		if (existeEnvio == null) {
			let localidad = ClienteService.getUsuario().localidad;
			let precio = EnviosService.getPrecioPorLocalidad(localidad);
			let itemEnvio = {
				_id: "envios",
				item: {
					precio: precio,
					nombre: `Servicio de Envios (${localidad})`
				},
				cantidad: 1
			};
			this.items_carrito_compras.push(itemEnvio);
			this.notifySubscribers();
			const cookies = new Cookies();
			let items = cookies.get("items",{path:"/"});
			items.push(itemEnvio);
			cookies.set("items", items,{path:"/"});
		}
	}

	/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 */
	static removeEnvios() {
		this.items_carrito_compras = this.items_carrito_compras.filter((c) => c._id !== "envios");
		this.notifySubscribers();
		const cookies = new Cookies();
		let items = cookies.get("items",{path:"/"});
		items = items.filter(item => item._id !== "envios");
		cookies.set("items", items,{path:"/"});
	}

		/**
	 * @todo SE DEBERA GUARDAR LOS CAMBIOS EN LAS COOKIES
	 */
		 static removeAllItems() {
			this.items_carrito_compras = [];
			const cookies = new Cookies();
			cookies.remove("items",{path:"/"})
			cookies.set("items",[],{path:"/"});
			this.notifySubscribers();
		}

	/**
	 * @returns El precio total de todos los items del carrito
	 */
	static getTotal() {
		return parseFloat(this.items_carrito_compras.reduce((anterior, actual) => {
			return anterior + (actual.item.precio * actual.cantidad);
		}, 0).toFixed(2));
	}

	/**
	 * Se decontara el stock de todos lo items del arrito
	 */
	static async descontarStockItemsCarrito(){
		try {
			await this.iniciarServicio();
			const items = this.items_carrito_compras;
			for(let i=0;i<items.length;i++){
				let current = items[i];
				current.item.existencia = current.item.existencia - current.cantidad;
				if(current.item.existencia <= 0){
					current.item.estado = "SIN_STOCK";
				}
				await ProductoService.modifyProducto(current.item);
			}
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}