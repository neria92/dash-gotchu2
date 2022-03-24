import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { Evidences } from './Evidences'
import { User } from './User'

export const AppealDetails = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [appeal, setAppeal] = useState({})
    const [users, setUsers] = useState([])
    const [capture, setCapture] = useState({})

    const location = useLocation()
    const id = location.pathname.split('/')[2]


    useEffect(() => {
        setIsLoading(true)
        db.collection('appeal').doc(id).get()
            .then((doc) => {
                if (doc.exists) { setAppeal({ ...doc.data(), id: doc.id }) }
            })
    }, [])

    useEffect(() => {
        if (!appeal?.id) return
        Promise.all(
            appeal?.involved?.map(id => db.doc(`users2/${id}`).get()
                .then(document => {
                    const { userData } = document.data();
                    delete userData.isLogged;
                    return userData;
                }))
        ).then((users) => {

            users.map(user => {
                if (user.userId == appeal.users.userAppeal.userId) {
                    user['userAppeal'] = true
                } else {
                    user['userAppeal'] = false
                }
            })
            setUsers(users)

        })
        db.collection('captures2').doc(appeal.captureId).get()
            .then((doc) => {
                if (doc.exists) {
                    setCapture({ ...doc.data(), uid: doc.id })
                }
            })
            .finally(() => setIsLoading(false))
    }, [appeal])

    const userAppeal = users.filter(element => element.userAppeal)[0]
    const userRejected = users.filter(element => !element.userAppeal)[0]

    const { reasonRejected, reasonAppeal } = appeal

    return (
        // container appeal
        <div className='max-w-5xl p-5 items-center justify-center mx-auto mt-20 bg-white py-10 rounded shadow-2xl shadow-pink-200'>
            <div className='container my-12 mx-auto px-4 md:px-12'>
                <div className='flex flex-wrap -mx-1 lg:-mx-4'>

                    <User
                        photo={userRejected?.photo}
                        name={userRejected?.username}
                        typeUser={'Usuario que rechazo'}
                        reason={reasonAppeal}
                    />
                    <Evidences

                    />
                    <User
                        photo={userAppeal?.photo}
                        name={userAppeal?.username}
                        typeUser={'Usuario que apela'}
                        reason={reasonRejected}

                    />

                </div>
            </div>
        </div >
    )
}



