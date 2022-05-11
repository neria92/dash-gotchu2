import React from 'react'
import Icon from '../Icon'
import { Link } from 'react-router-dom'

export const Card = ({ data, id, type }) => {
    const title = data?.missionData?.missionName || data?.missionData?.missionName || 'Captura libre'
    const image = data?.missionData?.media?.images[0]?.url || data?.evidences?.photos[0]?.url || data?.evidences?.videos[0]?.thumbnail
    const objective = data?.missionData?.missionObjetive || data?.missionData?.missionObjetive || data?.evidences?.texts
    const userPhoto = data?.userData?.photo
    const userName = data?.userData?.username
    const likes = data?.stats?.likesCount || 0
    const comments = data?.stats?.commentsCount || 0

    return (
        <div className="bg-white p-2 w-80 max-w-3xl sm:w-full sm:p-4 h-auto sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none my-5">

            <img src={image} className="h-52 aspect-square sm:h-full sm:w-72 rounded-xl  bg-center bg-cover" />


            <div className="flex sm:flex-1 flex-col gap-2 p-1">
                <div className='flex flex-row items-center '>
                    <img src={userPhoto} className='w-12 h-auto rounded-full' />
                    <span className='text-lg sm:text-xl font-semibold  text-pink-600 ml-5'>{userName}</span>
                </div>
                <h1 className="text-lg sm:text-xl font-semibold  text-gray-600">
                    {title}
                </h1>

                <p className="text-gray-500 text-sm sm:text-base line-clamp-3 text-clip overflow-hidden">
                    {objective}
                </p>
                <div className="flex gap-4 mt-auto">

                    <Reaction name='heart' value={likes} color='red' />
                    <Reaction name='comment' value={comments} />
                    <Reaction name='reject' value={comments} />
                    <ButtonNavigation id={id} type={type}/>
                </div>
            </div>
        </div>
    )
}

const ButtonNavigation = ({ type, id }) => {
    return (
        <Link className='ml-auto flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-pink-300 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500' to={`${type==='missions2'?'/missions/':'/captures/'}${id}`}>
            <span>ver más </span>
        </Link>
    )
}


const Reaction = ({ name, value, color = 'black' }) => {
    return (
        <button
            className='flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
        >
            <Icon
                name={name}
                style='w-3 h-auto md:w-6 md:w-6'
                color={color}
            />
            <span>{value}</span>
        </button>
    )
}