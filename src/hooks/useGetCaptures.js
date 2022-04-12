import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';


const typeStatus = ['Pending', 'Accepted', 'Rejected']

export default function useGetCaptures(type = 'all') {

    const [captures, setCaptures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDocumentGenral, setLastDocumentGenral] = useState(null);

    useEffect(() => {
        getCaptures(type)
        setLastDocumentGenral(null)
    }, [type])

    const getCaptures = (type) => {
        setIsLoading(true)
        if (type === 'all') {
            db.collection("captures2")
                .orderBy('date', 'desc')
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                })
                .finally(() => setIsLoading(false))
        }
        else if (typeStatus.includes(type)) {
            db.collection("captures2")
                .where('status', '==', type)
                .orderBy('date', 'desc')
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                })
                .finally(() => setIsLoading(false))
        } else {
            db.collection("captures2")
                .where('missionData.missionId', '==', type)
                .orderBy('date', 'desc')
                .limit(10)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                })
                .finally(() => setIsLoading(false))
        }
    }

    const getMoreCaptures = (type) => {
        if (!lastDocumentGenral) return
        setIsLoading(true)
        if (type === 'all') {
            db.collection('captures2')
                .orderBy('date', 'desc')
                .limit(10)
                .startAfter(lastDocumentGenral)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(prev => [...prev, ...querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
                })
                .finally(() => setIsLoading(false))
        }
        else if (typeStatus.includes(type)) {
            db.collection('captures2')
                .where('status', '==', type)
                .orderBy('date', 'desc')
                .limit(10)
                .startAfter(lastDocumentGenral)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(prev => [...prev, ...querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
                })
                .finally(() => setIsLoading(false))
        } else {
            db.collection("captures2")
                .where('missionData.missionId', '==', type)
                .orderBy('date', 'desc')
                .limit(10)
                .startAfter(lastDocumentGenral)
                .get()
                .then((querySnapshot) => {
                    setLastDocumentGenral(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                    setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                })
                .finally(() => setIsLoading(false))
        }
    }




    return [captures, setCaptures, getMoreCaptures, isLoading]
}





