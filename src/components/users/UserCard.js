import React from 'react'
import { Ranking } from '../Ranking'

export const UserCard = ({ item }) => {
    const { userData: { email, photo, username, userDescription, stats } } = item
    return (
        <div className='w-full h-80 rounded bg-blue-700 mb-5 flex flex-row  border-2 border-pink-300 shadow-sm shadow-pink-200'>
            <div className='flex-col w-2/3 items-center justify-center flex p-5 border-r border-pink-300 '>
                <img src={photo} className=' object-contain rounded-full' />
                <Ranking rating={stats.ranking} />
            </div>
            <div className=' w-full overflow-hidden flex justify-evenly flex-col'>
                <h3 className='ml-5  text-2xl text-white'>{username}</h3>
                <h3 className='ml-5  text-2xl text-white overflow-hidden '>{userDescription}</h3>
                <h3 className='ml-5  text-xl text-white '>{email}</h3>
                <h3 className='ml-5  text-xl text-green-500 hover:text-green-600 cursor-pointer '>Más...</h3>
            </div>

        </div>
    )
}
