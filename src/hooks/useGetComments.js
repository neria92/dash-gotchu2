import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export default function useGetComments({type='missions2',id}) {
    const [lastDocument, setLastDocument] = useState(null);


    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getComments()
    }, [])

    const getComments = () => {
        setIsLoading(true)

        db.collection(type)
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .limit(2)
            .get()
            .then((querySnapshot) => {
                setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                setComments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            .finally(() => setIsLoading(false))
    }

    const getMoreComments = () => {
        if (!lastDocument) return
        setIsLoading(true)
        db.collection(type)
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .limit(10)
            .startAfter(lastDocument)
            .get()
            .then((querySnapshot) => {
                setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
                setComments(prev => [...prev, ...querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
            })
            .finally(() => setIsLoading(false))
    }




    return [comments, getMoreComments, isLoading]
}





