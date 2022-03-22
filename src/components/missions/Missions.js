import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { CreateMissionBox } from './CreatMissionBox'
import { MissionBox } from './MissionBox'

export const Missions = () => {

    const [missions, setMissions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        db.collection('missions2').limit(34).orderBy('date', 'desc').get()
            .then((querySnapshot) => {
                setMissions(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className='max-w-5xl p-5 mx-auto mt-20  bg-blue-500 rounded shadow-2xl shadow-pink-200'>

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
                            />

                        })
                    }
                </div>

            </div>


        </div>
    )
}
