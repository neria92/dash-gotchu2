import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Icon from "../Icon";

registerLocale("es", es);
// CSS Modules, react-datepicker-cssmodules.css

export const Datepicker = ({ startDate, getDate, lugar = { right: '5%' }, intervalDates = [startDate] }) => {
    const position = Object.keys(lugar)
    const porcentaje = Object.values(lugar)
    return (
        <DatePicker
            selected={startDate}
            onChange={getDate}
            locale="es"
            withPortal
            maxDate={new Date()}
            highlightDates={intervalDates}
            dateFormat="dd-MMMM-yyyy"
            customInput={<InputDateSelect lugar={position[0]} porcentaje={porcentaje[0]} />}
        />
    );
};

const InputDateSelect = forwardRef(({ value, onClick, lugar, porcentaje }, ref) => {
    return (
        <div style={{
            width: "25%",
            display: 'flex',
            flexDirection: "row",
            padding: "5px",
            margin: "2px",
            flexWrap: "wrap",
            cursor: 'pointer'
        }}>

            <Icon
                name="pencil"
                style={{
                    backgroundColor: "orange",
                    borderRadius: "5px",
                    padding: "3px",
                    // margin: "2px",
                    width: '100%',
                    height: "auto",

                }}
                onClick={onClick}
                ref={ref}
            />



        </div>



    )
});
