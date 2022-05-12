import React from 'react'
import { Ranking } from '../Ranking'

export const UserCard = ({ userData }) => {
    const { photo, username, email } = userData
    return (
        <div className='p-4 mb-5 bg-white rounded dark:bg-[#2F4F4F] dark:border-[#2F4F4F]'>
            <header>
                <img alt="Placeholder" className="block rounded h-40 w-40 " src={photo} />
            </header>

            <div>
                <div>
                    <p className="text-lg text-white my-5 font-bold">
                        {username}
                    </p>
                </div>
                <InfoUser title='correo electronico' text={email} />
            </div>


        </div>
    )
}

const InfoUser = ({ title, text }) => {
    return (
        <div className='mt-1'>
            <h1 className=" text-sm text-gray-100 font-semi">
                {title}
            </h1>
            <p className="text-lg text-white -mt-1 font-bold">
                {text}
            </p>
        </div>
    )
}