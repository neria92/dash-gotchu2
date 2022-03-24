import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { Ranking } from '../Ranking'

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
        <div className='max-w-5xl p-5 mx-auto mt-20 bg-white py-10 rounded shadow-2xl shadow-pink-200'>
            <div className='container my-12 mx-auto px-4 md:px-12'>
                <div className='flex flex-wrap -mx-1 lg:-mx-4'>

                    <User
                        photo={userRejected?.photo}
                        name={userRejected?.username}
                        typeUser={'Usuario que Rechazo'}
                        reason={reasonAppeal}
                    />
                    <User
                        photo={userRejected?.photo}
                        name={userRejected?.username}
                        typeUser={'Usuario que Rechazo'}
                        reason={reasonRejected}

                    />




                </div>
            </div>
        </div >
    )
}


const User = ({ photo, name, typeUser, reason }) => {
    return (
        <div className="max-w-sm w-60 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-blue-200 dark:border-gray-200">
            <div className="flex justify-end px-4 pt-4">

            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={photo} alt={`image ${name}`} loading='lazy' />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-700">{typeUser}</span>
                <span className="text-sm text-gray-500 dark:text-gray-700">{reason}</span>
                <Ranking
                    rating={3}
                />

                <div className="flex mt-4 space-x-3 lg:mt-6">
                    <button href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">decirle ok</button>
                </div>
            </div>
        </div>

    )
}