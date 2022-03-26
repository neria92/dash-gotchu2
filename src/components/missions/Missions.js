import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { db } from '../../firebase/firebaseConfig'
import useGetMissions from '../../hooks/useGetMissions'
import Icon from '../Icon'
import { Pagination } from '../pagination/Paginations'
import { CreateMissionBox } from './CreatMissionBox'
import { MissionBox } from './MissionBox'

const Perpage = 11


export const Missions = () => {

    const container = useRef();
    const [missions, getMoreMissions, isLoading] = useGetMissions()
    const [pageNUmber, setPageNUmber] = useState(0);

    const pagesVisited = pageNUmber * Perpage


    const displayCaptures = missions?.slice(pagesVisited, pagesVisited + Perpage)

    const pageCount = Math.ceil(missions?.length / Perpage)

    const changePage = ({ selected }) => {
        setPageNUmber(selected);
    }

    const handleChangePage = (e) => {
        if (e.isNext) {

            getMoreMissions()
            setPageNUmber(prev => prev + 1)
        }
    }

    useEffect(() => {

        return () => {
            setPageNUmber(0)
        }
    }, [])


    return (
        <div id='container' className='max-w-5xl p-5 mx-auto mt-20  bg-blue-500 rounded shadow-2xl shadow-pink-200' ref={container}>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    <div className='container my-12 mx-auto px-4 md:px-12'>
                        <div className='flex flex-wrap   md:w-full items-center justify-center'>

                            <Pagination
                                handleChangePage={handleChangePage}
                                changePage={changePage}
                                pageCount={pageCount}
                                pageNUmber={pageNUmber}
                            />
                        </div>
                        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                            <CreateMissionBox />
                            {
                                displayCaptures.length > 0
                                &&
                                displayCaptures.map(mission => {
                                    const { missionData, userData, stats } = mission
                                    let { missionName, media: { images }, finishDate, startDate } = missionData
                                    startDate = startDate?.seconds ? new Date(startDate?.seconds * 1000) : new Date()
                                    finishDate = finishDate?.seconds ? new Date(finishDate?.seconds * 1000) : new Date()
                                    return <MissionBox
                                        key={mission.id}
                                        title={missionName}
                                        image={images[0]?.url}
                                        likes={stats?.likesCount || 0}
                                        user={userData?.username || 'Edgar'}
                                        userphoto={userData?.photo}
                                        startDate={startDate}
                                        finishDate={finishDate}
                                        id={mission.id}
                                    />

                                })
                            }
                        </div>
                        <div className='flex items-center justify-center'>

                            <Pagination
                                handleChangePage={handleChangePage}
                                changePage={changePage}
                                pageCount={pageCount}
                                pageNUmber={pageNUmber}
                            />
                        </div>

                    </div>
            }

            {/* <div className='absolute bottom-2 right-2 cursor-pointer border-4 rounded-full hover:animate-bounce '>
                <Icon
                    name='next'
                    style='w-12 h-12 rounded-full items-center justify-center bg-green-900 '
                    color='#fff'
                />
            </div> */}

        </div>
    )
}
