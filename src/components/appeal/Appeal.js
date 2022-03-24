import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { AppealCard } from './AppealCard';


export const Appeal = () => {

    const [appeals, setAppeals] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        db.collection('appeal').orderBy('date', 'desc').get().then((querySnapshot) => {
            setAppeals(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
            .finally(() => setIsLoading(false))
    }, [])

    console.log('appeals', appeals)

    return (
        <div>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center mt-32'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    appeals.length > 0
                    &&
                    appeals.map((appeal) => {

                        return <AppealCard
                            appeal={appeal}
                            key={appeal.id}
                        />
                    })
            }
        </div>
    )
}
