import React, { useState,useEffect } from 'react'
import Swal from "sweetalert2";
import Icon from '../../Icon';

export const Difficulty = ({ missionData, setMissionData,onReset }) => {

    const [difficulty, setDifficulty] = useState(missionData?.difficulty || 'Baja');
    const [isCheck, setIsCheck] = useState(false);


    const onChage = (e) => {
        setDifficulty(e.target.value)
    }

    const next = () => {

        if (!difficulty) {
            Swal.fire(
                "Error",
                "Ese necesario que tenga nivel de dificultad la misión",
                "error"
            );
            return
        }
        setIsCheck(true)
        setMissionData(prev => ({ ...prev, difficulty }))
    }

    useEffect(() => {
        setDifficulty('Baja')
        setIsCheck(false)
    }, [onReset])
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
                                            onChage={onChage}
                                            isActive={difficulty === 'Baja'}
                                        />
                                        <Button
                                            level='Media'
                                            onChage={onChage}
                                            isActive={difficulty === 'Media'}
                                        />
                                        <Button
                                            level='Alta'
                                            onChage={onChage}
                                            isActive={difficulty === 'Alta'}
                                        />

                                    </div>
                                </fieldset>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {
                                    !isCheck
                                        ?
                                        <button
                                            onClick={next}
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Guardar
                                        </button>
                                        :
                                        <Icon
                                            style='w-12 h-12 bg-green-500 rounded inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                                            name='check'
                                            color='#fff'
                                        />
                                }
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
