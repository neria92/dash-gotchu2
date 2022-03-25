import React from 'react'
import { useContext } from 'react'
import { EditMissionContext } from './context/EditMissionContext'

export const Objective = () => {

    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, [target.name]: value } })

    }
    const { missionObjetive } = mission.missionData

    return (
        <div className="mb-2 text-sm">
            <span className="font-medium text-pink-600 mr-2">Objetivo</span>
            {
                !isEdit
                    ? missionObjetive
                    :
                    <textarea
                        className='border border-blue-300 rounded w-full'
                        name='missionObjetive'
                        onChange={onChangeValues}
                        value={missionObjetive}
                    />
            }

        </div>
    )
}
