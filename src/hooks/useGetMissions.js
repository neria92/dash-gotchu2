import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export default function useGetMissions() {

    const [lastDocumentGenral, setLastDocumentGenral] = useState(null);


    const [missions, setMissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        getMissions()
    }, [])

    const getMissions = () => {
        setIsLoading(true)

        db.collection("missions2")
            .orderBy('date', 'desc')
            .limit(11)
            .get()
            .then((querySnapshot) => {
                setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                setMissions(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            .finally(() => setIsLoading(false))
    }

    const getMoreMissions = () => {
        if (!lastDocumentGenral) return
        setIsLoading(true)

        db.collection("missions2")
            .orderBy('date', 'desc')
            .limit(11)
            .startAfter(lastDocumentGenral)
            .get()
            .then((querySnapshot) => {
                setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                setMissions(prev => [...prev, ...querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
            })
            .finally(() => setIsLoading(false))
    }




    return [missions, getMoreMissions, isLoading]
}





