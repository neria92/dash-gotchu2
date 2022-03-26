import React, { useContext } from 'react'
import { CreatMissionContext } from './context/CreatMissionContext';

export const Rewards = () => {
    const { mission, setMission } = useContext(CreatMissionContext)

    const money = mission?.missionData?.loot?.money || ''
    const gCoins = mission?.missionData?.loot?.gCoins || ''
    const xp = mission?.missionData?.loot?.xp || ''

    const onChangeValues = ({ target }) => {
        const value = parseInt(target.value.replace(/[^0-9]/g, ''));
        if (!mission?.missionData?.loot) {
            setMission({ ...mission, missionData: { ...mission.missionData, loot: { [target.name]: value } } })
        }
        setMission({ ...mission, missionData: { ...mission.missionData, loot: { ...mission.missionData.loot, [target.name]: value } } })


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
                                        <legend className="text-base font-medium text-gray-900">Recopensas</legend>
                                    </div>
                                    <Input
                                        title={'pesos'}
                                        name='money'
                                        placeHolder='Dinero'
                                        onChange={onChangeValues}
                                        value={money}
                                    />
                                    <Input
                                        title={'gCoins'}
                                        name='gCoins'
                                        placeHolder='Gcoins'
                                        onChange={onChangeValues}
                                        value={gCoins}
                                    />
                                    <Input
                                        title={'xp'}
                                        name='xp'
                                        placeHolder='Xp'
                                        onChange={onChangeValues}
                                        value={xp}
                                    />
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

const Input = ({ title, name, placeHolder, onChange, value }) => {
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
                    value={value}
                />
            </div>
            <label className='mr-1'>{`${title}: `}</label>
        </div>
    )
}