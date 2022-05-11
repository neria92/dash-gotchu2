import React, { useState, useEffect } from 'react'
import useGetCaptures from '../../hooks/useGetContentReport'
import { Pagination } from '../pagination/Paginations'
import { Card } from './Card'
import { Menu } from './Menu'

const Perpage = 10

export const ContentReports = () => {
    const [selectType, setSelectType] = useState('missions2')
    const [data, getMoreCaptures, isLoading, existContent] = useGetCaptures(selectType);

    const [pageNUmber, setPageNUmber] = useState(0);
    const pagesVisited = pageNUmber * Perpage
    const displayCaptures = data?.slice(pagesVisited, pagesVisited + Perpage)
    const pageCount = Math.ceil(data?.length / Perpage) || 1

    const changePage = ({ selected }) => {
        setPageNUmber(selected);
    }

    const handleChangePage = (e) => {
        if (e.isNext && existContent) {

            getMoreCaptures()
            setPageNUmber(prev => prev + 1)
        }
    }

    useEffect(() => {
        return () => {
            setPageNUmber(0)
        }
    }, []);
    return (
        <div id='container' className='flex flex-col  max-w-5xl p-5 mx-auto mt-5  items-center justify-center rounded' >
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
                            selectType={selectType}
                            setSelectType={setSelectType}
                        />
                        <Pagination
                            handleChangePage={handleChangePage}
                            changePage={changePage}
                            pageCount={pageCount}
                            pageNUmber={pageNUmber}
                        />
                        {
                            displayCaptures.map((item) => {
                                return (
                                    <Card
                                        key={item.id}
                                        id={item.id}
                                        data={item?.data}
                                        type={selectType}
                                    />
                                )
                            })
                        } 
                        <Pagination
                            handleChangePage={handleChangePage}
                            changePage={changePage}
                            pageCount={pageCount}
                            pageNUmber={pageNUmber}
                        />
                    </>
            }
        </div>
    )
}
