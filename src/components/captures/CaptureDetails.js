import React, { useEffect, useState, useContext } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../firebase/firebaseConfig'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Comments } from '../missions/editMission/Comments'
import { MediaPreview } from './MediaPreview'
import Icon from '../Icon'
import { Save } from './Save'
import { Edit } from './Edit'
import { Stats } from './Sats'


export const CaptureDetails = () => {
    const coments = useRef();
    const rewards = useRef();


    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const [capture, setCapture] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        db.collection('captures2').doc(id).get()
            .then((doc) => {
                if (doc.exists) { setCapture({ ...doc.data(), id: doc.id }) }
            })
            .finally(() => setIsLoading(false))
    }, [])


    return (

        isLoading
            ?
            <div className='flex flex-col bg-transparent w-full items-center justify-center '>
                <div className='spinner'></div>
                <span className='text-ellipsis font-semibold mt-5 text-gray-900'>Cargando...</span>
            </div>
            :
            <EditCaptureContext.Provider value={{ capture, setCapture, isEdit }}>

                <div className='flex items-center justify-center mt-10'>

                    <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
                        <div className="w-full flex justify-between p-3">
                            <div className="flex">
                                <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                                    <img src={capture?.userData?.photo} alt='image-mission' />
                                </div>
                                <span className="pt-1 ml-2 font-bold text-sm">{capture?.userData?.username}</span>
                            </div>
                            {
                                !isEdit
                                    ?
                                    <Edit setIsEdit={setIsEdit} />
                                    :
                                    <Save setIsEdit={setIsEdit} />

                            }

                        </div>
                        <div className="my-2">
                            {/* <Title /> */}
                        </div>
                        <MediaPreview
                            media={capture.evidences}
                        />

                        <div className='flex justify-center items-center mt-2'>
                            {/* <DatesMission /> */}
                        </div>
                        <div className="px-3 pb-2">
                            <div className="pt-2 flex flex-row">
                                <Stats
                                    name='heart'
                                    color='#E00F10'
                                    title={capture?.stats?.likesCount + ' me gusta'}
                                />
                                <Stats
                                    name='send'
                                    color='blue'
                                    title={capture?.stats?.commentsCount + ' comentarios'}
                                    onClick={() => coments.current.classList.toggle('hidden')}
                                />
                                <Stats
                                    name='coin'
                                    color='blak'
                                    title={capture?.missionData?.loot?.gCoins || 0}

                                />

                                <Stats
                                    name='xp'
                                    color='blue'
                                    title={capture?.missionData?.loot?.xp || 0}

                                />
                                <Stats
                                    name='money'
                                    color='blue'
                                    title={capture?.missionData?.loot?.money || 0}

                                />

                            </div>
                            <div className="pt-1">
                                {/* <Objective /> */}
                            </div>
                            <div className="pt-1">
                                {/* <Difficulty /> */}
                            </div>
                           
                            <div className='hidden' id='coments' ref={coments} >
                                <Comments
                                    countComments={capture?.stats?.commentsCount}
                                    id={capture.id}
                                    type='captures2'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </EditCaptureContext.Provider>


    )
}



