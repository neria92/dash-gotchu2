import React, { useState, useEffect, useContext } from 'react'
import Swal from "sweetalert2";
import Icon from '../../Icon';
import { CreatMissionContext } from './context/CreatMissionContext';

export const Difficulty = () => {

    const { mission, setMission } = useContext(CreatMissionContext)

    const difficulty = mission?.missionData?.difficulty || 'Baja'

    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, [target.name]: value } })

    }


    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <fieldset>
                                    <div>
                                        <legend className="text-base font-medium text-gray-900">Nivel de dificultad</legend>
                                        <p className="text-sm text-gray-500">Será el nivel que se muestre</p>
                                    </div>
                                    <div className="mt-4 space-y-4">

                                        <Button
                                            level='Baja'
                                            onChage={onChangeValues}
                                            isActive={difficulty === 'Baja'}
                                        />
                                        <Button
                                            level='Media'
                                            onChage={onChangeValues}
                                            isActive={difficulty === 'Media'}
                                        />
                                        <Button
                                            level='Alta'
                                            onChage={onChangeValues}
                                            isActive={difficulty === 'Alta'}
                                        />

                                    </div>
                                </fieldset>
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

const Button = ({ level, onChage, isActive }) => {
    return (
        <div className="flex items-center">
            <input
                id="push-everything"
                name="difficulty"
                type="radio"
                onChange={onChage}
                value={level}
                checked={isActive}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700"> {level} </label>
        </div>
    )
}
