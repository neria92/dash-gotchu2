import React from 'react'
import {useState, useEffect } from 'react';
import Swal from "sweetalert2";

import { useForm } from '../../../hooks/useForm'
import Icon from '../../Icon'

export const Rewards = ({ missionData, setMissionData,onReset }) => {
    const [{ money, gCoins, xp }, onChange] = useForm({
        money: missionData?.loot?.money || 0,
        gCoins: missionData?.loot?.gCoins || '',
        xp: missionData?.loot?.xp || ''
    })
    const [isCheck, setIsCheck] = useState(false)

    const onChangeNumber = ({ target }) => {
        target.value = target.value.replace(/[^0-9]/g, '');
        onChange({ target });
    }

    const next = () => {
        
        if (!gCoins) {
            Swal.fire(
                "Error",
                "Ese necesario que la misión cuente con gCoins",
                "error"
            );
            return
        }
        if (!xp) {
            Swal.fire(
                "Error",
                "Ese necesario que la misión cuente con puntos de experiencia",
                "error"
            );
            return
        }
        setIsCheck(true)
        setMissionData(prev => ({ ...prev, loot: { money, gCoins, xp } }))
    }

    useEffect(() => {
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
                                        <legend className="text-base font-medium text-gray-900">Recopensas</legend>
                                    </div>
                                    <Input
                                        title={'pesos'}
                                        name='money'
                                        placeHolder='Dinero'
                                        onChange={onChangeNumber}
                                    />
                                    <Input
                                        title={'gCoins'}
                                        name='gCoins'
                                        placeHolder='Gcoins'
                                        onChange={onChangeNumber}
                                    />
                                    <Input
                                        title={'xp'}
                                        name='xp'
                                        placeHolder='Xp'
                                        onChange={onChangeNumber}
                                    />
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

const Input = ({ title, name, placeHolder, onChange }) => {
    return (
        <div className="flex items-center">
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    type="text"
                    name={name}
                    id={title}
                    onChange={onChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1  block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder={placeHolder}
                />
            </div>
            <label className='mr-1'>{`${title}: `}</label>
        </div>
    )
}