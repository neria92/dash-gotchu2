import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';



export default function useGetCaptures() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDocumentCaptures, setLastDocumentCaptures] = useState(null);
    const [lastDocumentMissions, setLastDocumentMissions] = useState(null);

    useEffect(() => {
        getCaptures()
    }, [])

    const getCaptures = () => {
        setIsLoading(true)
        Promise.all([
            db.collection("captures2")
                .orderBy("reports", "desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentCaptures(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    return (querySnapshot.docs.map(doc => ({ capture: doc.data(), id: doc.id })));
                }),
            db.collection("missions2")
                .orderBy("reports", "desc")
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentMissions(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    return (querySnapshot.docs.map(doc => ({ mission: doc.data(), id: doc.id })));
                })

        ])
            .then(res => {
                let newData = [];
                for (const dataQuery of res) {
                    newData = [...newData, ...dataQuery];
                }
                setData(newData)
            })
            .finally(() => setIsLoading(false))

    }

    const getMoreCaptures = () => {
        const queryPromises = []
        if (lastDocumentCaptures) {
            queryPromises.push(db.collection('captures2')
                .orderBy("reports", "desc")
                .limit(10)
                .startAfter(lastDocumentCaptures)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentCaptures(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    return (querySnapshot.docs.map(doc => ({ capture: doc.data(), id: doc.id })));
                }))
        }
        if (lastDocumentMissions) {
            queryPromises.push(
                db.collection("missions2")
                    .orderBy("reports", "desc")
                    .startAfter(lastDocumentMissions)
                    .limit(10)
                    .get()
                    .then((querySnapshot) => {
                        setLastDocumentMissions(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                        return (querySnapshot.docs.map(doc => ({ mission: doc.data(), id: doc.id })));
                    })
            )
        }
        setIsLoading(true)
        Promise.all(queryPromises)
            .then(res => {
                let newData = [];
                for (const dataQuery of res) {
                    newData = [...newData, ...dataQuery];
                }
                setData([...data, ...newData])
            })
            .finally(() => setIsLoading(false))

    }




    return [data, getMoreCaptures, isLoading, (!!lastDocumentCaptures || !!lastDocumentMissions)]
}





