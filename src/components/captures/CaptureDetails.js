import React, { useEffect, useState, useContext } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../firebase/firebaseConfig'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Comments } from '../missions/editMission/Comments'
import { MediaPreview } from './MediaPreview'


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
                            <div className="pt-2">
                                <i className="far fa-heart cursor-pointer"></i>
                                <span className="text-sm text-gray-400 font-medium">{capture?.stats?.likesCount > 0 && capture?.stats?.likesCount + ' me gusta'}</span>
                                <i className="far fa-heart cursor-pointer"></i>
                                <span className="ml-2 text-sm text-gray-400 font-medium cursor-pointer hover:text-red-300 hover:animate-bounce" onClick={() => coments.current.classList.toggle('hidden')}>{capture?.stats?.commentsCount > 0 && capture?.stats?.commentsCount + ' comentarios'}</span>
                            </div>
                            <div className="pt-1">
                                {/* <Objective /> */}
                            </div>
                            <div className="pt-1">
                                {/* <Difficulty /> */}
                            </div>
                            <span className="font-medium text-pink-600 mr-2 cursor-pointer" onClick={() => rewards.current.classList.toggle('hidden')}>Recompesas</span>
                            <div className="hidden" ref={rewards} id='rewards'>
                                {/* <Rewards /> */}
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

const Save = ({ setIsEdit }) => {

    const { mission } = useContext(EditCaptureContext)

    const updateChange = () => {
        setIsEdit(prev => !prev)
        const newMission = { ...mission }
        delete newMission.id
        db.doc(`captures/${mission.id}`).update(newMission)
    }
    return (
        <span className="px-2 bg-green-700/20 hover:bg-green-300 cursor-pointer rounded"
            onClick={updateChange}
        >Guardar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
    )
}

const Edit = ({ setIsEdit }) => {
    return (
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"
            onClick={() => setIsEdit(prev => !prev)}
        >Editar<i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
    )
}

