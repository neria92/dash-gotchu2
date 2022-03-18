import React, { useState } from 'react'
import { intervalDates } from '../../../helpers/intervalDays';
import { Datepicker } from '../../datePicker/DatePicker';



export const DateMission = () => {

    const [initialDate, setInitialDate] = useState(null);

    const [finishDate, setFinishDate] = useState(null);



    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">


                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6 justify-center items-center">
                                <div>
                                    <legend className="text-base font-medium text-gray-900">Fecha</legend>
                                </div>
                                <div date-rangepicker="" className="flex items-center">
                                    <Datepicker
                                        date={finishDate}
                                        getDate={setFinishDate}
                                        placeholder='inico de misión'
                                    />
                                    <span className="mx-4 text-gray-500">a</span>

                                    <Datepicker
                                        date={initialDate}
                                        getDate={setInitialDate}
                                        placeholder='fin de misión'
                                    />

                                </div>

                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </>

    )
}
