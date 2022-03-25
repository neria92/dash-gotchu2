import React from 'react'
import { useContext } from 'react'
import { EditMissionContext } from './context/EditMissionContext'

export const Title = () => {
    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, [target.name]: value } })

    }

    const { missionName } = mission.missionData

    return (
        !isEdit
            ? <div className='ml-3 text-bold text-pink-600 font-medium'>{missionName}</div>
            :
            <input
                className='border border-blue-300 rounded w-2/6'
                name='missionName'
                onChange={onChangeValues}
                value={missionName}
            />

    )
}
