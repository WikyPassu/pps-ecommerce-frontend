import UtilsService from "./UtilsService";
const token = "TEST-8145171060277886-110105-845001e4473950c8bdb5f96ec41e17c5-256136854"
const axios = require("axios")
export default class FacturasService {
	static facturas = [];
	static pagos = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.facturas);
		})
	}

	/**
	 * Inicia el servicio con todos los datos que se necesitan para que funcione. Se ejecutaria cada vez que se refresque la pagina.
	* TRAER OBJETOS DEL BACKEND.
	* @returns Array de objetos
	*/
	static async iniciarServicio() {
		try {
			const res = await fetch(UtilsService.getUrlsApi().factura.traerTodas);
			const data = await res.json();
			this.facturas = data.facturas;
			await this.getPagosFromMercadoPago();
			//console.log(this.pagos)
			this.notifySubscribers();
			return this.facturas;
		} catch (err) {
			console.log(err);
		}

		return this.facturas;
	}

	static getFacturas() {
		return this.facturas;
	}

	static getFacturaPorId(_id) {
		return this.facturas.filter(c => c._id === _id)[0];
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} newItem 
	 * @return Factura creada y guardada en la bd ?? revisalo culas 
	 */
	static async addFactura(newItem) {
		try {
			await fetch(UtilsService.getUrlsApi().factura.agregar, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ factura: newItem })
			});
			this.facturas.push(newItem);
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @param {*} item 
	 */
	static async modifyFactura(item) {
		let _id = JSON.stringify(item);
		delete item._id;
		_id = JSON.parse(_id);
		_id = _id._id;

		try {
			await fetch(UtilsService.getUrlsApi().factura.modificar, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id, factura: item })
			});
			item._id = _id;
			this.facturas = this.facturas.map((c) => (c._id === item._id) ? item : c);
			this.notifySubscribers();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * GUARDAR CAMBIOS EN BACKEND
	 * @todo CULAS: no hay boton eliminar, no puedo testear
	 * @param {*} _id ID del objeto
	 */
	static async removeFactura(_id) {
		try {
			await fetch(UtilsService.getUrlsApi().factura.eliminar, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id: _id })
			});
			this.facturas = this.facturas.filter((c) => (c._id !== _id));
			this.iniciarServicio();
		} catch (err) {
			console.log(err);
		}
	}

	static async getPagosFromMercadoPago() {
		try {
			let res = await fetch("https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc", {
				headers: {
					"Authorization": "Bearer " + token,
					'Content-Type': 'application/json'
				}
			});
			let data = await res.json();
			this.pagos = data.results
				.map(({
					id,
					date_created,
					date_approved,
					payment_type_id,
					status,
					status_detail,
					description,
					currency_id,
					payer,
					additional_info,
					transaction_amount,
					order
				}) => {
					return {
						id,
						date_created,
						date_approved,
						payment_type_id,
						status,
						status_detail,
						description,
						currency_id,
						amount: transaction_amount,
						orderId: order.id,
						payer: {
							id: payer.id,
							email: payer.email,
							dni: payer.identification.number,
							type: payer.type
						},
						items: additional_info.items.map(({ quantity, title, unit_price }) => {
							return {
								quantity,
								price: parseFloat(unit_price),
								title
							}
						})
					}
				})
				.filter((c) => {
					return c.status === "pending" || c.status === "approved" || c.status === "authorized" || c.status === "in_process" || c.status === "refunded";
				});
			return this.pagos;
		} catch (error) {
			Promise.reject(error);
		}
	}

	static getPagos() {
		return this.pagos;
	}

	static getPagosPorMes(anio = (new Date()).getFullYear()) {
		let pagosEsteAnio = this.pagos.filter((c) => {
			let fechaPago = new Date(c.date_created);
			return fechaPago.getFullYear() === anio;
		});
		return pagosEsteAnio.reduce((prev, curr) => {
			let fechaPago = new Date(curr.date_created);
			prev[fechaPago.getMonth()].y++;
			return prev;
		}, [
			{ x: "Enero", y: 0 },
			{ x: "Febrero", y: 0 },
			{ x: "Marzo", y: 0 },
			{ x: "Abril", y: 0 },
			{ x: "Mayo", y: 0 },
			{ x: "Junio", y: 0 },
			{ x: "Julio", y: 0 },
			{ x: "Agosto", y: 0 },
			{ x: "Septiembre", y: 0 },
			{ x: "Octubre", y: 0 },
			{ x: "Noviembre", y: 0 },
			{ x: "Diciembre", y: 0 }
		])
	}

	/**
	 * @param {*} paymentId 
	 * @returns 
	 */
	static async getPayerByPaymentId(paymentId) {
		try {
			let res = await axios({
				url:UtilsService.getUrlsApi().metodoPago.obtenerComprador,
				method:"post",
				headers: {
					'Content-Type': 'application/json'
				},
				data:{paymentId}
			})
			let data = res.data;
			return data;
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * @param {*} email 
	 * @returns 
	 */
		 static async getPaymentsByEmail(email) {
			try {
				let res = await axios({
					url:UtilsService.getUrlsApi().metodoPago.obtenerPagosPorEmail,
					method:"post",
					headers: {
						'Content-Type': 'application/json'
					},
					data:{email}
				})
				let data = res.data;
				return data;
			} catch (error) {
				console.log(error)
			}
		}
d


}