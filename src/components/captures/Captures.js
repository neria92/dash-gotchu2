import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import useGetCaptures from '../../hooks/useGetCaptures'
import { Pagination } from '../pagination/Paginations'
import { Menu } from './Menu'
import { Table } from './Table'

const Perpage = 10

export const Captures = () => {

    const [typeEvidences, setTypeEvidences] = useState('all');
    const [captures, setCaptures, getMoreCaptures, isLoading] = useGetCaptures(typeEvidences)


    const [pageNUmber, setPageNUmber] = useState(0);

    const pagesVisited = pageNUmber * Perpage


    const displayCaptures = captures?.slice(pagesVisited, pagesVisited + Perpage)

    const pageCount = Math.ceil(captures?.length / Perpage) || 1

    const changePage = ({ selected }) => {
        setPageNUmber(selected);
    }

    const handleChangePage = (e) => {
        if (e.isNext) {
            setPageNUmber(prev => prev + 1)
            getMoreCaptures(typeEvidences)
        }
    }

    useEffect(() => {
        setPageNUmber(0)
    }, [typeEvidences])


    return (
        <div className='animate__animated animate__fadeIn'>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center mt-32'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    <>

                        <Menu
                            selectType={typeEvidences}
                            setSelectType={setTypeEvidences}
                        />

                        <div className='p-10'>
                            <Pagination
                                handleChangePage={handleChangePage}
                                changePage={changePage}
                                pageCount={pageCount}
                                pageNUmber={pageNUmber}
                            />
                            <Table
                                displayCaptures={displayCaptures}
                                setCaptures={setCaptures}
                                columns={[
                                    { title: 'photo', field: 'userData', subField: 'photo' },
                                    { title: 'Usuario', field: 'userData', subField: 'username' },
                                    { title: 'fecha', field: 'userData', subField: 'username' },
                                    { title: 'Estado', field: 'status' },
                                    { title: 'Misión', field: 'missionData' },
                                    { title: 'pago', field: '' },
                                    { title: 'Ver más' },
                                ]}

                            />
                            <Pagination
                                handleChangePage={handleChangePage}
                                changePage={changePage}
                                pageCount={pageCount}
                                pageNUmber={pageNUmber}
                            />
                        </div>
                    </>

            }
        </div>
    )
}
