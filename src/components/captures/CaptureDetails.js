import React, { useEffect, useState, useContext } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../firebase/firebaseConfig'
import { EditCaptureContext } from './context/EditCaptureContext'
import { Comments } from '../missions/editMission/Comments'
import { MediaPreview } from './MediaPreview'
import { Save } from './Save'
import { Edit } from './Edit'
import { Stats } from './Stats'
import { timeAgo } from '../../helpers/timeAgo'
import { DropDown } from './DropDown'


export const CaptureDetails = () => {
    const coments = useRef();

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

                <div className='flex items-center justify-center mt-10 '>

                    <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
                        <div className="w-full flex justify-between  p-3">
                            <div className='w-1/3 flex flex-row'>
                                <div className="flex justify-center overflow-hidden">
                                    <img className="rounded-full h-12 w-12" src={capture?.userData?.photo} alt='image-mission' />
                                </div>
                                <div className='flex  flex-col '>
                                    <span className="pt-1 ml-2 font-semibold text-xl">{capture?.userData?.username}</span>
                                    <span className="pt-1 ml-2 text-xs text-gray-600 text-left">{timeAgo(capture?.date?.seconds * 1000)}</span>
                                </div>
                            </div>
                            <div className="flex w-1/3  justify-center items-center flex-col ">
                                <span className="text-lg text-gray-600 text-left">Missión</span>
                                <span className='text-bold text-pink-600 font-bold text-xl'>{capture?.missionData?.missionName}</span>
                            </div>
                            <div className='w-1/3 flex justify-end'>

                                <DropDown />
                                {/* {
                                    !isEdit
                                        ?
                                        <Edit setIsEdit={setIsEdit} />
                                        :
                                        <Save setIsEdit={setIsEdit} />

                                } */}
                            </div>

                        </div>

                        <MediaPreview />

                        <div className='flex justify-center items-center mt-2'>
                            {/* <DatesMission /> */}
                        </div>
                        <div className="px-3 pb-2">

                            <Stats coments={coments} />

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



