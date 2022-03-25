import React from 'react'
import { useContext } from 'react'
import { Datepicker } from '../../datePicker/DatePickerMission'
import { EditMissionContext } from './context/EditMissionContext'


export const DatesMission = ({ initial, finish }) => {
    const { isEdit } = useContext(EditMissionContext)

    return (
        <div className="items-center">

            <div date-rangepicker="" className="flex items-center">
                <Datepicker
                    date={initial}
                    readOnly={!isEdit}
                    // getDate={setInitialDate}
                    placeholder='fin de misión'
                />
                <span className="mx-4 text-gray-500">a</span>
                <Datepicker
                    date={finish}
                    readOnly={!isEdit}

                    // getDate={setFinishDate}
                    placeholder='inico de misión'
                />


            </div>

        </div>
    )
}