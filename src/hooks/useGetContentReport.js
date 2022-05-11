import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';



export default function useGetCaptures(type) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDocumentCaptures, setLastDocumentCaptures] = useState(null);


    useEffect(() => {
        getCaptures(type)
        setLastDocumentCaptures(null)
    }, [type])

    const getCaptures = (type) => {
        setIsLoading(true)

        db.collection(type)
            .orderBy("reports", "desc")
            .limit(10)
            .get()
            .then((querySnapshot) => {
                setLastDocumentCaptures(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                setData(querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id })));
            }).finally(() => setIsLoading(false))




    }

    const getMoreCaptures = (type) => {
        setIsLoading(true)

        if (lastDocumentCaptures) {
            db.collection(type)
                .orderBy("reports", "desc")
                .limit(10)
                .startAfter(lastDocumentCaptures)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentCaptures(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setData(prev => [...prev, ...querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))]);
                }).finally(() => setIsLoading(false))

        }


    }




    return [data, getMoreCaptures, isLoading, !!lastDocumentCaptures]
}





