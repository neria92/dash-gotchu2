
import React, { useContext } from 'react'
import dayjs from "dayjs";
import { Datepicker } from '../../datePicker/DatePicker';
import { UserContext } from '../context/UserContext';



export const Date = () => {

    const { user ,startDate,setStartDate} = useContext(UserContext)

    const handleStartDate = (date) => {
        setStartDate(date)
        
    }

    const handleFinishDate = (date) => {
    }

    const finishDate = dayjs().toDate()

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="flex px-4 py-5  space-y-6 sm:p-6 justify-end items-end">
                              
                                <div date-rangepicker="" className="flex items-center">
                                    <Datepicker
                                        date={startDate}
                                        getDate={handleStartDate}
                                        placeholder='fin de misión'
                                    />
                                    <span className="mx-4 text-gray-500">a</span>
                                    <Datepicker
                                        date={finishDate}
                                        getDate={handleFinishDate}
                                        placeholder='inico de misión'
                                        readOnly={true}
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
         
        </>

    )
}
