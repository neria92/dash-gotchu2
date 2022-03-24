import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { getMedia } from '../../helpers/getMedia'
import { Evidences } from './Evidences'
import { Map } from './Map'
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



    return (
        <div className='max-w-5xl p-5 mx-auto mt-20 bg-white py-10 rounded shadow-2xl shadow-pink-200'>
            <div className='container  my-12 mx-auto px-4 md:px-12'>
                {
                    isLoading
                        ?
                        <div className='flex flex-col bg-transparent w-full items-center justify-center '>
                            <div className='spinner'></div>
                            <span className='text-ellipsis font-semibold mt-5 text-gray-900'>Cargando...</span>
                        </div>
                        :
                        <div className='flex flex-wrap   justify-between  -mx-1 lg:-mx-4'>

                            <User
                                photo={userRejected?.photo}
                                name={userRejected?.username}
                                typeUser={'Usuario que rechazo'}
                                reason={appeal?.reasonAppeal}
                                ranking={userRejected?.stats?.ranking}
                                type='rechaza'
                                button='rechazar apelación'

                            />
                            <div className='bg-green-400/30 '>
                                <h5 className='text-center text-2xl text-semibold text-pink-400'> {appeal?.missionData?.missionName}</h5>

                                <Information title='Objetivo de la misión :' text={appeal?.missionData?.missionObjetive} />
                                <h1 className='text-black mt-2 ml-2'>Evidencias enviadas de {userAppeal?.username}</h1>
                                <Evidences media={getMedia(capture.evidences)} />
                                <Information title='Ubicación de la misión:' text={appeal?.missionData?.geoData?.address} />

                                <Map
                                    missionPoint={[appeal?.missionData?.geoData?.latitude || 0, appeal?.missionData?.geoData?.longitude || 0]}
                                    evidencesPoint={[capture?.geoData?.coords?.latitude || 0, capture?.geoData?.coords?.longitude || 0]}
                                />

                            </div>
                            <User
                                photo={userAppeal?.photo}
                                name={userAppeal?.username}
                                typeUser={'Usuario que apela'}
                                reason={appeal?.reasonRejected}
                                ranking={userAppeal?.stats?.ranking}
                                type='apela'
                                button='acceptar apelación'
                            />

                        </div>
                }
            </div>
        </div >
    )
}



const Information = ({ title = '..', text = '..' }) => {

    const infoText = useRef();

    const [isView, setIsView] = useState(false);

    const onHandleClick = () => {
        infoText.current.classList.toggle('whitespace-nowrap')
        setIsView(prev => !prev)
    }
    return (
        <div className='md:w-96 ' >
            <h5 className="mt-4 ml-2 normal-case font-medium text-gray-900 dark:text-gray mb-4">{title}</h5>
            <h1 className="text-lg ml-2 whitespace-nowrap  overflow-hidden text-ellipsis" id='infoText' ref={infoText}>
                <span className="no-underline  overflow-hidden  text-black" >
                    {text}

                </span>
            </h1>
            {
                text.length > 40
                &&
                <h1 className='ml-2 hover:underline cursor-pointer' onClick={onHandleClick}>
                    <span>
                        {
                            !isView
                                ? 'ver mas...'
                                : 'ver menos'
                        }
                    </span>
                </h1>
            }
        </div >
    )
}