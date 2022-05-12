import React, { useEffect } from 'react'
import { useSearchUsers } from '../../hooks/useSearchUsers'
import { useForm } from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import Icon from '../Icon'


export const Searcher = () => {


    const [usersSearching, searchUsers, isLoading] = useSearchUsers()

    const [{ search }, onChange] = useForm({
        search: ''
    })

    const handleOnchange = ({ target }) => {
        onChange({ target })
        searchUsers(target.value)
    }

   


    return (
        <div className=" relative mr-3 md:mr-0 md:block w-full">
            {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <Icon
                    name='search'
                    style='w-4 h-4'
                />
            </div> */}
            <input
                name='search'
                type="text"
                id="search"
                value={search}
                onChange={handleOnchange}
                autoComplete='off'
                className="block p-2 pl-10 w-full text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar usuario..."
            />
            {
                usersSearching.length > 0
                &&
                <div className='absolute mt-10 overflow-hidden bg-white rounded-lg shadow-lg top-0 left-0 border border-gray-200 z-10 w-full'>
                    {
                        usersSearching.map(({ username, userId, photo }, index) => (
                            <section key={index}>
                                <Item username={username} userId={userId} photo={photo} />
                            </section>
                        ))
                    }
                </div>
            }
        </div>


    )
}

const Item = ({ photo, userId, username }) => {

    return (
        <div className='hover:bg-blue-200 flex gap-4 p-4' >
            <img src={photo} className='w-8 h-8 rounded-full object-contain' alt='image_mission' />
            <div>
                <h3 className='text-sm font-semibold'>{username}</h3>
            </div>

        </div>
    )
}