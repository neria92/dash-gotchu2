import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Icon from "../Icon";

registerLocale("es", es);
// CSS Modules, react-datepicker-cssmodules.css

export const Datepicker = ({ date, getDate, placeholder ,}) => {

    return (
        <DatePicker
            selected={date}
            onChange={getDate}
            locale="es"
            withPortal
            // maxDate={new Date()}
            // highlightDates={intervalDates}
            dateFormat="dd-MMMM-yyyy"
            customInput={<InputDateSelect placeholder={placeholder} />}
        />
    );
};

const InputDateSelect = forwardRef(({ value, onClick,placeholder='fecha' }, ref) => {
    console.log('value', placeholder)
    return (
        <div className="relative" onClick={onClick}>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </div>
            <input
                className="bg-blue-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-blue-500 dark:border-blue-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                name="end"
                type={value?"text":'button'}
                placeholder={value ? value : placeholder}
            />
        </div>
    )
});
