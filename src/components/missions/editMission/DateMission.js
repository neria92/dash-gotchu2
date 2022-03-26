import React from 'react'
import { useContext } from 'react'
import { Datepicker } from '../../datePicker/DatePickerMission'
import { EditMissionContext } from './context/EditMissionContext'


export const DatesMission = () => {

    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const handleStartDate = (date) => {
        setMission({ ...mission, missionData: { ...mission.missionData, startDate: date } })
    }

    const handleFinishDate = (date) => {
        setMission({ ...mission, missionData: { ...mission.missionData, finishDate: date } })
    }

    let { startDate, finishDate } = mission?.missionData
    startDate = startDate?.seconds * 1000 || startDate
    finishDate = finishDate?.seconds * 1000 || finishDate
    
    return (
        <div className="items-center">

            <div date-rangepicker="" className="flex items-center">
                <Datepicker
                    date={new Date(startDate)}
                    readOnly={!isEdit}
                    getDate={handleStartDate}
                    placeholder='fin de misión'
                />
                <span className="mx-4 text-gray-500">a</span>
                <Datepicker
                    date={new Date(finishDate)}
                    readOnly={!isEdit}
                    getDate={handleFinishDate}
                    placeholder='inico de misión'
                />


            </div>

        </div>
    )
}