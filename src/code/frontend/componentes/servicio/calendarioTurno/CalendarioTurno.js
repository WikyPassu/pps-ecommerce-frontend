import './CalendarioTurno.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FormControl } from 'react-bootstrap';
import { useState } from 'react';
//import UtilsService from '../../../../servicios/UtilsService';

function CalendarioTurno({ diasNoDisponibles, onChange, name, value = new Date() }) {

    const [fecha, setFecha] = useState(new Date(value));
    const [visibilidadCalendario,setVisibilidadCalendario] = useState(false);
    const handleChange = (e) => {
        setFecha(e);

        if (onChange) { onChange({
            target:{
                value:e,
                name:name
            }
        }) };
    }

    const isDisabled = (date) => {
        if (date.getTime() < new Date().getTime()){
            return true;
        }
        if (diasNoDisponibles) {
            for (let i = 0; i < diasNoDisponibles.length; i++) {
                let c = diasNoDisponibles[i];
                if (c.getDate() === date.getDate() &&
                        c.getHours() === date.getHours() &&
                        c.getMonth() === date.getMonth() &&
                        c.getFullYear() === date.getFullYear() &&
                        c.getMinutes() === date.getMinutes()) {
                    return true;
                }
            }
        }
        return false;
    }
    const diasDeshabilitados = ({ activeStartDate, date, view }) => {
        return isDisabled(date);
    };

    return (
        <div onMouseLeave={()=>{setVisibilidadCalendario(false)}} className="CalendarioTurno">
            <FormControl readOnly onClick={()=>{setVisibilidadCalendario(true)}} value={`${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`} />
            {visibilidadCalendario&&<Calendar
                
                onChange={handleChange}
                tileDisabled={diasDeshabilitados}
                view="month"
                defaultValue={fecha}
            />}
        </div>
    );
}

CalendarioTurno.defaultValue = {
    diasNoDisponibles: [],
    onChange: () => { }
}

export default CalendarioTurno;