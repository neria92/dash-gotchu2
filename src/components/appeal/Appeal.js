import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { AppealCard } from './AppealCard';


export const Appeal = () => {

    const [appeals, setAppeals] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        db.collection('appeal').orderBy('date','desc').get().then((querySnapshot) => {
            setAppeals(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
            .finally(() => setIsLoading(false))
    }, [])

    console.log('appeals',appeals)

    return (
        <div>
            {
                appeals.length > 0
                &&
                appeals.map((appeal) => {

                    return <AppealCard
                        appeal={appeal}
                    />
                })
            }
        </div>
    )
}
