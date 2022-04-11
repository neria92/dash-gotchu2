import React from 'react'
import { useRef } from 'react'
import { Searcher } from './Searcher'

export const Menu = () => {

    const menu = useRef();

    const handleClick = () => {
        menu.current.classList.toggle('hidden')
    }

    return (
        <nav className=" px-2 sm:px-4 py-2.5 rounded w-2/3 mx-auto mt-5 ">
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <div className="flex md:order-2">
                    <Searcher />
                    <button data-collapse-toggle="mobile-menu-3" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-blue-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false" onClick={handleClick}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden text-center justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3" id='menu' ref={menu}>
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium">
                        

                    </ul>
                </div>
            </div>
        </nav>
    )
}


