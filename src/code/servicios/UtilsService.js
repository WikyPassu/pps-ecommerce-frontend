console.log('Utils service iniciado');
const URLAPI = "https://api-ppc.herokuapp.com";
/**
 * Contiene un conjunto de herramientas para propositos generales.
 */
export default class UtilsService{

    static loading = false;

    static observers = [];
	
	static subscribeToLoading(callback) {
		this.observers.push(callback);
	}

	static notifySubscribersToLoading() {
		this.observers.forEach((current) => {
			current(this.loading);
		})
	}

    /**
     * Muestra o desaparece icono de cargar el parametro que se ingresa
     * @param {*} state 
     */
    static setLoading(state){
        this.loading = state;
        this.notifySubscribersToLoading();
    }

    static getLoading(){
        return this.loading;
    }
    /**
     * Debido a que a veces el timeStamp le faltan algunos ceros (porque no contempla los milisegundos), se creo esta funcion para solventar ese problema.
     * @param {*} timeStamp
     * @returns 
     */
    static timeStampToStringDate(timeStamp){
        let timeStampString = (timeStamp+"");
        if(timeStampString.length < 13){
            for(let i = timeStampString.length;i<13;i++){
                timeStampString += "0"; 
            }
        }
        return (new Date(parseInt(timeStampString))).toLocaleString();
    }

    /**
     * @todo Agregar todas las urls que faltan. Asegurarse de que tengan un nombre de atributo acorde.
     * @returns Devuelve un objeto con todas las url de la api.
     */
    static getUrlsApi(){
        return {
            metodoPago:{
                realizarPago:URLAPI+"/metodoPago/realizarPago"
            },
            productos:{
                traerTodos:URLAPI+"/producto/traerTodos"
            }
            
        }
    }

}