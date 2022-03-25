import React, { useContext } from 'react'
import { useForm } from '../../../hooks/useForm'
import { EditMissionContext } from './context/EditMissionContext'

export const Rewards = () => {

    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const { money, gCoins, xp } = mission.missionData.loot

    const onChangeValues = ({ target }) => {
        const value = parseInt(target.value.replace(/[^0-9]/g, ''));
        setMission({ ...mission, missionData: { ...mission.missionData, loot: { ...mission.missionData.loot, [target.name]: value } } })

    }
    return (
        <div className="mb-2 text-sm">

            <Reward
                name='money'
                title='dinero'
                value={money}
                edit={isEdit}
                onChange={onChangeValues}
            />
            <Reward
                name='gCoins'
                title='gCoins'
                value={gCoins}
                edit={isEdit}
                onChange={onChangeValues}
            />
            <Reward
                name='xp'
                title='xp'
                value={xp}
                edit={isEdit}
                onChange={onChangeValues}
            />
        </div>
    )
}

const Reward = ({ name, value, edit, onChange, title }) => {
    return (
        <div className='flex font-medium text-gray-800'>
            <div className='w-20'>
                <span className="font-medium text-pink-600 mr-2">{title}</span>
            </div>
            <div >
                {
                    !edit
                        ? value
                        :
                        <input
                            className='border border-blue-300 rounded w-2/6'
                            name={name}
                            onChange={onChange}
                            value={value}
                        />
                }
            </div>

        </div>
    )

}