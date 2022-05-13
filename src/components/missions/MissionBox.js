import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'


export const MissionBox = ({ image, title, user, userphoto, finishDate, likes, id, startDate }) => {

    const dateString = new Intl.DateTimeFormat('es', { dateStyle: 'short' }).format(finishDate)
    const startDateString = new Intl.DateTimeFormat('es', { dateStyle: 'short' }).format(startDate)


    return (

        <Link className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" to={'/missions/' + id}>

            <article className="overflow-hidden rounded-lg shadow-lg bg-slate-100 cursor-pointer hover:bg-slate-400">
                <div className=''>
                    <img alt="imageMssion" className="aspect-video object-cover block h-auto w-full" src={image} loading='lazy' />
                </div>
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg truncate text-ellipsis overflow-hidden">
                        <span className="no-underline hover:underline text-black  " >
                            {title}
                        </span>
                    </h1>
                    <div className='flex  items-center justify-center '>
                        <p className="text-grey-darker text-sm">
                            {startDateString + '-'}
                        </p>
                        <p className="text-grey-darker text-sm">
                            {dateString}
                        </p>
                    </div>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <div className="flex items-center no-underline hover:underline text-black" >

                        <div className='h-8 w-8'>
                            <img alt="Placeholder" className="block rounded-full" src={userphoto} />
                        </div>
                        <p className="ml-2 text-sm">
                            {user}
                        </p>
                    </div>
                    <div className="flex items-center justify-between  no-underline w-1/5 h-2 text-grey-darker hover:text-red-dark  mr-2">
                        <Icon
                            name='heart'
                            style='w-6 h-6'
                            color='red'
                        />
                        <span className="flex text-blue-500 text-sm ml-1 ">{likes}</span>
                    </div>
                </footer>

            </article>


        </Link>
    )
}

