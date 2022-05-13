import React from 'react'
import Icon from '../../components/Icon'
export const StatsUser = ({ stats }) => {
    const money = stats?.money || 0
    const gCoins = stats?.gCoins || 0
    const xp = stats?.xp || 0
    const following = stats?.following || 0
    const followers = stats?.followers || 0
    const totalPayForGotchu = stats?.totalPayForGotchu || 0

    return (
        <div className='mb-5 bg-white rounded dark:bg-[#2F4F4F] dark:border-[#2F4F4F]'>
            <div className="grid grid-cols-3 gap-4 justify-center items-center">
                <Item title={'Dinero'} name='money' value={`$${money}`} color={'black'} />
                <Item title={'XP'} name='xp' value={`${xp}`} color={'black'} />
                <Item title={'gCoins'} name='gCoins' value={`${gCoins}`} color={'black'} />
                <Item title={'Followers'} name='following' value={`${followers}`} color={'black'} />
                <Item title={'Following'} name='following' value={`${following}`} color={'black'} />
                <Item title={'Pagado'} name='money' value={`${totalPayForGotchu}`} color={'black'} />
                
            </div>

        </div>
    )
}


const Item = ({ title, name, value, color }) => {
    return (
        <div className='flex flex-col  justify-center items-center border-white'>
            <h1 className='text-white font-bold'>{title}</h1>
            <Icon
                name={name}
                style='w-6 h-6'
                color={color}
            />
            <h1 className='text-white font-semibold'>{value}</h1>
        </div>
    )
}