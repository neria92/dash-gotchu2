import React, { useContext } from 'react'

import { Datepicker } from '../../datePicker/DatePicker';
import Icon from '../../Icon';
import { CreatMissionContext } from './context/CreatMissionContext';



export const DateMission = () => {

    const { mission, setMission, onReset } = useContext(CreatMissionContext)

    const handleStartDate = (date) => {
        setMission({ ...mission, missionData: { ...mission.missionData, startDate: date } })
    }

    const handleFinishDate = (date) => {
        setMission({ ...mission, missionData: { ...mission.missionData, finishDate: date } })
    }

    const startDate = mission?.missionData?.startDate || null
    const finishDate = mission?.missionData?.finishDate || null

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
                                        date={startDate}
                                        getDate={handleStartDate}
                                        placeholder='fin de misión'
                                    />
                                    <span className="mx-4 text-gray-500">a</span>
                                    <Datepicker
                                        date={finishDate}
                                        getDate={handleFinishDate}
                                        placeholder='inico de misión'
                                    />


                                </div>

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
