import React, { useContext } from 'react'

import { EditMissionContext } from './context/EditMissionContext'
import { Item } from './Item'

export const Stats = ({ coments }) => {


    const { mission, setMission, isEdit } = useContext(EditMissionContext)

    const { money, gCoins, xp } = mission.missionData.loot

    const onChangeValues = ({ target }) => {
        const value = parseInt(target.value.replace(/[^0-9]/g, ''));
        setMission({ ...mission, missionData: { ...mission.missionData, loot: { ...mission.missionData.loot, [target.name]: value } } })

    }
    return (
        <div className="pt-2 flex flex-row">
            <Item
                name='heart'
                color='#E00F10'
                title={mission?.stats?.likesCount || 0 + ' me gusta'}
            />
            <Item
                name='send'
                color='blue'
                title={mission?.stats?.commentsCount || 0 + ' comentarios'}
                onClick={() => coments.current.classList.toggle('hidden')}
            />
            <Item
                name='gCoins'
                color='blak'
                title={mission?.missionData?.loot?.gCoins || 0}

            />

            <Item
                name='xp'
                color='blue'
                title={mission?.missionData?.loot?.xp || 0}

            />
            <Item
                name='money'
                color='blue'
                title={mission?.missionData?.loot?.money || 0}

            />

        </div>
    )
}
