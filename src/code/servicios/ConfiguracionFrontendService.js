import React from 'react'
console.log('Configuracion Frontend servicios iniciado');
/**
 * Se habia decidido quitar el carrusel.
 * @deprecated 
 */
export default class FrontendConfigService extends React.Component {
	static imagenesCarrusel = [];
	static observers = [];
	static subscribe(callback) {
		this.observers.push(callback);
	}

	static notifySubscribers() {
		this.state.observers.forEach((current) => {
			current(this.imagenesCarrusel);
		})
	}

	static getImagenesCarrusel() {
		return this.imagenesCarrusel;
	}

    // static getProductoPorCodigo(codigo){
    //     return this.productos.filter(c => c.codigo === codigo)[0];
    // }

	static addImagenCarrusel(newItem) {
		this.imagenesCarrusel.push(newItem);
		this.notifySubscribers();
	}

	static removeImagenCarruselById(id) {
        console.warn("removeItem esta hardcodeado")
		this.imagenesCarrusel = this.imagenesCarrusel.filter(c=>c.id !== id)
		this.notifySubscribers();
	}
}