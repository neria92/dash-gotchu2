import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { db } from '../../firebase/firebaseConfig'
import Icon from '../Icon'
import { CreateMissionBox } from './CreatMissionBox'
import { MissionBox } from './MissionBox'


export const Missions = () => {

    const container = useRef();
    
    const [missions, setMissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        db.collection('missions2').limit(32).orderBy('date', 'desc').get()
            .then((querySnapshot) => {
                setMissions(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
            .finally(() => setIsLoading(false))
    }, [])


    return (
        <div id='container' className='max-w-5xl p-5 mx-auto mt-20  bg-blue-500 rounded shadow-2xl shadow-pink-200' ref={container}>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    <div className='container my-12 mx-auto px-4 md:px-12'>
                        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                            <CreateMissionBox />
                            {
                                missions.length > 0
                                &&
                                missions.map(mission => {
                                    const { missionData, userData, stats } = mission
                                    const { missionName, media: { images }, finishDate } = missionData
                                    return <MissionBox
                                        key={mission.id}
                                        title={missionName}
                                        image={images[0]?.url}
                                        likes={stats?.likesCount || 0}
                                        user={userData?.username || 'Edgar'}
                                        userphoto={userData?.photo}
                                        finishDate={new Date(finishDate.seconds * 100)}
                                        id={mission.id}
                                    />

                                })
                            }
                        </div>

                    </div>
            }

            {/* <div className='absolute bottom-2 right-2 cursor-pointer border-4 rounded-full hover:animate-bounce '>
                <Icon
                    name='next'
                    style='w-12 h-12 rounded-full items-center justify-center bg-green-900 '
                    color='#fff'
                />
            </div> */}

        </div>
    )
}
