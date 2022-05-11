import React, { useState, useEffect } from 'react'
import useGetCaptures from '../../hooks/useGetContentReport'
import { Pagination } from '../pagination/Paginations'
import { Card } from './Card'

const Perpage = 10

export const ContentReports = () => {
    const [data, getMoreCaptures, isLoading, existContent] = useGetCaptures()

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
    }, [])
    return (
        <div id='container' className='flex flex-col  max-w-5xl p-5 mx-auto mt-20  items-center justify-center rounded' >
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
                            mission={item?.mission}
                            capture={item?.capture}
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
        </div>
    )
}
