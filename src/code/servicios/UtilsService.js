console.log('Utils service iniciado');
//const URLAPI = "http://localhost:8080";
const URLAPI = "https://api-ppc.herokuapp.com";

/**
 * Contiene un conjunto de herramientas para propositos generales.
 */
export default class UtilsService {

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
    static setLoading(state) {
        this.loading = state;
        this.notifySubscribersToLoading();
    }

    static getLoading() {
        return this.loading;
    }
    /**
     * Debido a que a veces el timeStamp le faltan algunos ceros (porque no contempla los milisegundos), se creo esta funcion para solventar ese problema.
     * @param {*} timeStamp
     * @returns 
     */
    static timeStampToStringDate(timeStamp) {
        let timeStampString = (timeStamp + "");
        if (timeStampString.length < 13) {
            for (let i = timeStampString.length; i < 13; i++) {
                timeStampString += "0";
            }
        }
        return (new Date(parseInt(timeStampString))).toLocaleString();
    }

    /**
     * Devuelve un string mas corto con 3 puntitos si es que no llego al final.
     * Muy util para mostrar las descripcion de productos/servicios, por ejemplo.
     * @param {*} target 
     * @param {*} maxLenth 
     * @returns Un string con la logitud maxima ingresa, mas 3 puntitos al final.
     */
    static stringFormatter(target = "", maxLenth = 0) {
        return target.length > maxLenth ? target.substring(0, maxLenth - 3).concat("...") : target;
    }

    /**
     * @todo Agregar todas las urls que faltan. Asegurarse de que tengan un nombre de atributo acorde.
     * @returns Devuelve un objeto con todas las url de la api.
     */
    static getUrlsApi() {
        return {
            metodoPago:{
                realizarPago:URLAPI+"/metodoPago/realizarPago"
            },
            productos:{
                agregar:URLAPI+"/producto/agregar", 
                modificar:URLAPI+"/producto/modificar", 
                eliminar:URLAPI+"/producto/eliminar", 
                buscar:URLAPI+"/producto/buscar", 
                traerTodos:URLAPI+"/producto/traerTodos", 
                traerMasVendido:URLAPI+"/producto/traerMasVendido", 
                traerMasVendidos:URLAPI+"/producto/traerMasVendidos",
            }, 
            servicio:{
                agregar:URLAPI+"/servicio/agregar", 
                modificar:URLAPI+"/servicio/modificar", 
                eliminar:URLAPI+"/servicio/eliminar", 
                traerTodos:URLAPI+"/servicio/traerTodos",
                buscar:URLAPI+"/servicio/buscar",
                traerMasVendido:URLAPI+"/servicio/traerMasVendido",
                traerMasVendidos:URLAPI+"/servicio/traerMasVendidos",
            },
            turno:{
                agregar:URLAPI+"/turno/agregar", 
                modificar:URLAPI+"/turno/modificar", 
                eliminar:URLAPI+"/turno/eliminar", 
                traerTodos:URLAPI+"/turno/traerTodos",
                traerTodosIdUsuario:URLAPI+"/turno/traerTodosUsuario",
            },
            consumible:{
                agregar:URLAPI+"/consumible/agregar", 
                modificar:URLAPI+"/consumible/modificar", 
                eliminar:URLAPI+"/consumible/eliminar", 
                traerTodos:URLAPI+"/consumible/traerTodos",
                actualizar:URLAPI+"/consumible/actualizar"
            },
            factura:{
                agregar:URLAPI+"/factura/agregar", 
                modificar:URLAPI+"/factura/modificar", 
                eliminar:URLAPI+"/factura/eliminar", 
                traerTodas:URLAPI+"/factura/traerTodas", 
                traerTodasUsuario:URLAPI+"/factura/traerTodasUsuario", 
                traerTodasTemporada:URLAPI+"/factura/traerTodasTemporada", 
            },
            usuarioRegistrado:{
                agregar:URLAPI+"/usuarioRegistrado/agregar", 
                modificar:URLAPI+"/usuarioRegistrado/modificar", 
                eliminar:URLAPI+"/usuarioRegistrado/eliminar", 
                traerTodos:URLAPI+"/usuarioRegistrado/traerTodos", 
                login:URLAPI+"/usuarioRegistrado/login", 
            },
            empleado:{
                agregar:URLAPI+"/empleado/agregar", 
                modificar:URLAPI+"/empleado/modificar", 
                eliminar:URLAPI+"/empleado/eliminar", 
                traerTodos:URLAPI+"/empleado/traerTodos", 
                login:URLAPI+"/empleado/login", 
            },
            resenia:{
                agregar:URLAPI+"/resenia/agregar", 
                modificar:URLAPI+"/resenia/modificar", 
                eliminar:URLAPI+"/resenia/eliminar", 
                verificarCompraPrevia:URLAPI+"/resenia/verificarCompraPrevia", 
            }

        }
    }

}