import React from 'react'
import { useContext } from 'react'
import { EditMissionContext } from './context/EditMissionContext'

export const Difficulty = () => {

    const { mission, setMission, isEdit } = useContext(EditMissionContext);

    const { difficulty } = mission.missionData

    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, difficulty: value } })

    }

    return (
        <div className="mb-2 text-sm">
            <span className="font-medium text-pink-600 mr-2">Dificultad</span>
            {
                !isEdit
                    ? difficulty
                    :
                    <div className="mt-4 space-y-4">

                        <Button
                            level='Bajo'
                            onChage={onChangeValues}
                            isActive={difficulty === 'Bajo'}
                        />
                        <Button
                            level='Medio'
                            onChage={onChangeValues}
                            isActive={difficulty === 'Medio'}
                        />
                        <Button
                            level='Alto'
                            onChage={onChangeValues}
                            isActive={difficulty === 'Alto'}
                        />

                    </div>
            }

        </div>

    )
}


const Button = ({ level, onChage, isActive }) => {
    return (
        <div className="flex items-center">
            <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                onChange={onChage}
                value={level}
                defaultChecked={isActive}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700"> {level} </label>
        </div>
    )
}