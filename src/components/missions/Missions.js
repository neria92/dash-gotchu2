import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { Box } from './Box'

export const Missions = () => {

    const [missions, setMissions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        db.collection('missions2').get()
            .then((querySnapshot) => {
                setMissions(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
            .finally(() => setIsLoading(false))
    }, [])
    console.log('missions', missions)

    return (
        <div className='min-h-screen'>
            <div className='max-w-4xl p-10 mx-auto my-20 bg-blue-500 rounded shadow-2xl shadow-pink-500'>
                <ul className='grid grid-cols-4 gap-4'>
                    {
                        missions.length > 0
                        &&
                        missions.map(mission => {
                            const { missionData } = mission
                            const { missionName, media: { images } } = missionData
                            return (
                                <Box title={missionName || 'sdd'} image={images[0].url || 'sjdsjk'} />
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}
