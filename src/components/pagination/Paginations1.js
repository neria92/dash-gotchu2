import React from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'


export const Pagination = ({ data, handleChangePage }) => {

    const [pageNUmber, setPageNUmber] = useState(0);
    
    const pagesVisited = pageNUmber * Perpage

    const [pageNUmber, setPageNUmber] = useState(0);

    const displayCaptures = data?.slice(pagesVisited, pagesVisited + Perpage)

    const pageCount = Math.ceil(data?.length / Perpage) || 1

    const changePage = ({ selected }) => {
        setPageNUmber(selected);
    }


    return (
        <div className='flex justify-center items-center py-5 mb-20 md:mb-0 w-full'>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                onClick={handleChangePage}
                pageCount={pageCount}
                onPageChange={changePage}
                forcePage={pageNUmber}
                containerClassName="paginationBttns"
                previousClassName="previousBttn"
                disabledClassName="paginationDisabled"
                nextClassName="nextBttn"
                activeLinkClassName='paginationActive'

            />
        </div>

    )
}
