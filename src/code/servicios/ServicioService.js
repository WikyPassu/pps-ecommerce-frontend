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

    static getSevicioPorId(id){
        return this.servicios.filter(c => c.id === id)[0];
    }

	static addServicio(newItem) {
		this.servicios.push(newItem);
		this.notifySubscribers();
	}

	static modifyServicio(item){
		console.warn("Modificar producto",item);
		this.servicios = this.servicios.map((c)=> (c.id === item.id) ? item : c);
		this.notifySubscribers();
	}

	static removeServicio() {
        console.warn("removeItem esta hardcodeado")
		this.servicios.pop();
		this.notifySubscribers();
	}
}