import React from 'react'
import { Link } from 'react-router-dom'

export const AppealCard = ({ appeal }) => {
    const { missionData, users,id } = appeal
    const { media: { images }, missionName, missionObjetive,missionId } = missionData
    const imageMission = images[0]?.url

    const { userAppeal, userRejected } = users
    return (

        
        <Link className="shadow-lg mt-20 flex  flex-wrap w-full lg:w-4/5 mx-auto bg-white rounded" to={'/appeal/' + id}>

            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
                    <img className='rounded aspect-square object-cover  h-auto w-full' alt='image' src={imageMission} />
                </div>
                <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">


                        <div className="text-gray-900 font-bold text-xl mb-2 "> {missionName}</div>
                        <p className="text-gray-700 text-base">{missionObjetive}</p>
                    </div>
                    <div className="flex items-center justify-between ">
                        <div className='flex  items-center'>
                            <img className="w-10 h-10 rounded-full mr-4" src={userRejected?.photo} alt="Avatar of Jonathan Reinink" />
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">{userRejected?.username}</p>
                                <p className="text-gray-600">Lider</p>
                            </div>
                        </div>
                        <div className='flex  items-center'>
                            <img className="w-10 h-10 rounded-full mr-4" src={userAppeal?.photo} alt="Avatar of Jonathan Reinink" />
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">{userAppeal?.username}</p>
                                <p className="text-gray-600">Responsable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>


    )
}
