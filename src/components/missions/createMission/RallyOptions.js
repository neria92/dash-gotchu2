import React, { useContext, useState } from 'react'
import { CreatMissionContext } from './context/CreatMissionContext';

export const RallyOptions = () => {
    const { mission, setMission } = useContext(CreatMissionContext);
    const [stage, setStage] = useState('')

    const onChangeValues = ({ target }) => {
        const value = target.value
        setStage(value)
        setMission({
            ...mission, isPrivate: value !== 'firtsStage', missionData: {
                ...mission.missionData, nextMission: '',
                type: value === 'finishStage' ? 'finalRally' : 'rally'
            }
        })
    }

    return (
        <fieldset>
            <div>
                <legend className="text-base font-medium text-gray-900">Selecione en que paso esta la misión</legend>

            </div>
            <div className="mt-4 space-y-4">

                <Button
                    stage='firtsStage'
                    name='Primer etapa'
                    onChage={onChangeValues}
                    isActive={stage === 'firtsStage'}
                />
                <Button
                    stage='intermediateStage'
                    name='Etapa intermedia'
                    onChage={onChangeValues}
                    isActive={stage === 'intermediateStage'}
                />
                <Button
                    stage='finishStage'
                    name='Etapa final'
                    onChage={onChangeValues}
                    isActive={stage === 'finishStage'}
                />

            </div>
        </fieldset>
    )
}

const Button = ({ stage, name, onChage, isActive }) => {
    return (
        <div className="flex items-center">
            <input
                id="rally"
                name="rally"
                type="radio"
                onChange={onChage}
                value={stage}
                checked={isActive}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700"> {name} </label>
        </div>
    )
}
