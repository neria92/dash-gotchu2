import React from 'react'
import ReactPaginate from 'react-paginate'
import './pagination.css'


export const Pagination = ({ pageCount, changePage, pageNUmber,handleChangePage }) => {

    return (        

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

    )
}
