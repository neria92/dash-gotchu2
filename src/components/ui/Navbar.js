import React, { useRef, Fragment } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { UserLogin } from './UserLogin';



export const Navbar = () => {

    const menu = useRef();

    const buttonOnClick = () => {
        menu.current.classList.toggle('hidden')
    }

    return (
        <>
            <div className='flex items-center justify-between flex-wrap bg-pink-500  p-6'>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <div className='fill-current h-8 w-8 mr-2'>
                        <img src={'gotchu.svg'} alt='gotchu' />
                    </div>
                    <span className="font-semibold text-xl tracking-tight">Gotchu!</span>
                </div>
                <div className="block lg:hidden">
                    <button
                        id='boton'
                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                        onClick={buttonOnClick}
                    >
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div id='menu' ref={menu} className="w-full block flex-grow lg:flex lg:items-center text-center lg:w-auto hidden">
                    <div className="text-sm text-cyan-700 lg:flex-grow">

                        <NavLink
                            className={({ isActive }) => `block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 font-bold text-lg ${isActive ? 'text-white' : 'text-gray-900'}`}
                            to="/missions"
                        >
                            Misiones
                            
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 font-bold text-lg ${isActive ? 'text-white' : 'text-gray-900'}`}
                           
                            to="/appeal"
                        >
                            Apelaciones
                            
                        </NavLink>

                    </div>
                    <UserLogin />

                </div>
            </div>
            <Outlet />
        </>
    )
}

