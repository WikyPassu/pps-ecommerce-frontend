console.log('Utils service iniciado');
export default class UtilsService{

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

}