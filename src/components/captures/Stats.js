import React, { useContext } from 'react'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Item } from './Item'

export const Stats = ({ coments }) => {

    const { capture } = useContext(EditCaptureContext);

    return (
        <div className="pt-2 flex flex-row">
            <Item
                name='heart'
                color='#E00F10'
                title={capture?.stats?.likesCount + ' me gusta'}
            />
            <Item
                name='send'
                color='blue'
                title={capture?.stats?.commentsCount + ' comentarios'}
                onClick={() => coments.current.classList.toggle('hidden')}
            />
            <Item
                name='coin'
                color='blak'
                title={capture?.missionData?.loot?.gCoins || 0}

            />

            <Item
                name='xp'
                color='blue'
                title={capture?.missionData?.loot?.xp || 0}

            />
            <Item
                name='money'
                color='blue'
                title={capture?.missionData?.loot?.money || 0}

            />

        </div>
    )
}
