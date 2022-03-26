import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import Icon from '../Icon'

const SRC='https://firebasestorage.googleapis.com/v0/b/gchgame.appspot.com/o/GotchuBW.jpg?alt=media&token=c7441686-2e57-4d8f-b6f5-7c97a045d6bb'

export const CreateMissionBox = () => {

    return (
        <NavLink
            to="/createMission"
            className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 "
        >

            <article className="overflow-hidden rounded-lg shadow-lg bg-slate-100 cursor-pointer hover:bg-slate-400">
                <div className=''>
                    <Icon style='aspect-video object-cover block h-auto w-full' name='gotchu' color={'blue'} />
                </div>
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                        <span className="no-underline hover:underline text-black" >
                            Crear misión
                        </span>
                    </h1>
                    <div className='flex flex-col items-center justify-center '>
                        <p className="text-grey-darker text-sm">
                            fecha
                        </p>
                       
                    </div>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <div className="flex items-center no-underline hover:underline text-black" >

                        <div className='h-8 w-8'>
                            <img alt="Placeholder" className="block rounded-full" src={SRC} />
                        </div>
                        <p className="ml-2 text-sm">
                            Gotchu!
                        </p>
                    </div>
                    <div className="flex items-center justify-between no-underline w-4 h-2 text-grey-darker hover:text-red-dark  mr-2">
                        <img alt='like' src='like.svg' className='flex' />
                        <span className="flex text-blue-500 text-sm ml-1 ">1k</span>
                    </div>
                </footer>

            </article>

        </NavLink>

    )
}

const shorName = (name) => {
    if (name.length > 15) {
        return name.slice(0, 12) + '...'
    }
    return name
}