import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useSearchMissions } from '../../hooks/useSearchMissions'
import { useForm } from '../../hooks/useForm'

export const Menu = ({ selectType, setSelectType }) => {

    const [{ search }, onChange] = useForm({
        search: ''
    })

    const [missions, searchMissions, isLoading] = useSearchMissions()

    const menu = useRef();

    const handleClick = () => {
        menu.current.classList.toggle('hidden')
    }

    const handleOnchange = ({ target }) => {

        onChange({ target })
        searchMissions(target.value)

    }




    return (
        <nav className=" border-2 border-gray-200 px-2 sm:px-4 py-2.5 rounded w-2/3 mx-auto mt-5 ">
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <div className="flex md:order-2">
                    <div className="hidden relative mr-3 md:mr-0 md:block">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input
                            name='search'
                            type="text"
                            id="search"
                            value={search}
                            onChange={handleOnchange}
                            className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar por misión..."
                        />
                    </div>
                    <button data-collapse-toggle="mobile-menu-3" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-blue-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false" onClick={handleClick}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden text-center justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3" id='menu' ref={menu}>
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium">
                        <Button
                            isActive={selectType === 'all'}
                            onChange={setSelectType}
                            title='Todas'
                            value='all'
                        />
                        <Button
                            isActive={selectType === 'Accepted'}
                            onChange={setSelectType}
                            title='Aceptadas'
                            value='Accepted'
                        />
                        <Button
                            isActive={selectType === 'Rejected'}
                            onChange={setSelectType}
                            title='Rechazadas'
                            value='Rejected'
                        />
                        <Button
                            isActive={selectType === 'Pending'}
                            onChange={setSelectType}
                            title='Pendientes'
                            value='Pending'
                        />

                    </ul>
                </div>
            </div>
        </nav>
    )
}


const Button = ({ title, onChange, value, isActive }) => {
    return (
        <button
            className={`block py-2 pr-4 pl-3 text-white  
            ${isActive
                    ? 'bg-pink-500 rounded md:bg-transparent md:text-pink-500 md:p-0 dark:text-white'
                    : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
            `}
            onClick={() => onChange(value)}
        >
            {title}
        </button>
    )
}