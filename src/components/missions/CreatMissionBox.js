import React from 'react'
import Icon from '../Icon'

export const CreateMissionBox = () => {


    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">

            <article className="overflow-hidden rounded-lg shadow-lg bg-slate-100 cursor-pointer hover:bg-slate-400">
                <div className=''>
                    <div alt="Placeholder" className="aspect-video object-cover block h-auto w-full" >
                        <Icon />
                    </div>
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
                        <p className="text-grey-darker text-sm">
                            hora
                        </p>
                    </div>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a className="flex items-center no-underline hover:underline text-black" >

                        <div className='h-8 w-8'>
                            <img alt="Placeholder" className="block rounded-full" src='gotchu.svg' />
                        </div>
                        <p className="ml-2 text-sm">
                            Gotchu
                        </p>
                    </a>
                    <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                        <img alt='like' src='like.svg' />
                        <span className="text-blue-500 text-sm">1k</span>
                    </a>
                </footer>

            </article>


        </div>
    )
}

const shorName = (name) => {
    if (name.length > 15) {
        return name.slice(0, 12) + '...'
    }
    return name
}