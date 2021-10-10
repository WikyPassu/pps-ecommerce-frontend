import React from 'react'
console.log('Producto servicios iniciado');
export default class ServicioService extends React.Component {
	static servicios = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.observers.forEach((current) => {
			current(this.servicios);
		})
	}
	static getServicios() {
		return this.servicios;
	}

    static getSevicioPorCodigo(codigo){
        return this.servicios.filter(c => c.codigo === codigo)[0];
    }

	static addServicio(newItem) {
		this.servicios.push(newItem);
		this.notifySubscribers();
	}

	static modifyServicio(item){
		console.warn("Modificar producto",item);
		this.servicios = this.servicios.map((c)=> (c.codigo === item.codigo) ? item : c);
		this.notifySubscribers();
	}

	static removeServicio() {
        console.warn("removeItem esta hardcodeado")
		this.servicios.pop();
		this.notifySubscribers();
	}
}