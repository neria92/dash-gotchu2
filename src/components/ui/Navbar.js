import React, { useRef, Fragment } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { UserLogin } from './UserLogin';

const SRC = 'https://firebasestorage.googleapis.com/v0/b/gchgame.appspot.com/o/gotchu2dise%C3%B1o%2Ffoto_de_perfil_gotchu.png?alt=media&token=0b92afb9-e169-4fda-8275-de60d59d8d7f'

export const Navbar = () => {

    const menu = useRef();

    const buttonOnClick = () => {
        menu.current.classList.toggle('hidden')
    }

    return (
        <>
            <div className='flex items-center justify-between flex-wrap bg-pink-500  p-3'>
                <NavLink className="flex items-center flex-shrink-0 text-white mr-6" to="/missions">
                    <div className='fill-current h-10 w-10 mr-2' >
                        <img src={SRC} alt='gotchu' className='rounded-full ' />
                    </div>
                    <span className="font-semibold text-xl tracking-tight">Gotchu!</span>
                </NavLink>
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

                        <ItemNav
                            to="/missions"
                            title='Misiones'
                        />
                        <ItemNav
                            to="/appeal"
                            title='Apelaciones'
                        />

                        <ItemNav
                            to="/captures"
                            title='Capturas'
                        />
                        <ItemNav
                            to="/users"
                            title='Usuarios'
                        />

                        <ItemNav
                            to="/ContentReports"
                            title='Reportes'
                        />

                    </div>
                    <UserLogin />

                </div>
            </div>
            <Outlet />
        </>
    )
}
const ItemNav = ({ to = '/', title = 'Misiones' }) => {
    return (
        <NavLink
            className={({ isActive }) => `block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4 font-bold text-lg ${isActive ? 'text-white' : 'text-gray-900'}`}

            to={to}
        >
            {title}

        </NavLink>
    )
}
