import React, { useEffect, useMemo } from 'react'
import { useSearchMissions } from '../../hooks/useSearchMissions'
import { useForm } from '../../hooks/useForm'


export const Searcher = () => {


    const [missions, searchMissions, isLoading] = useSearchMissions()

    const [{ search }, onChange] = useForm({
        search: ''
    })

    const handleOnchange = ({ target }) => {
        onChange({ target })
        searchMissions(target.value)
    }

    return (
        <div className=" relative mr-3 md:mr-0 md:block">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input
                name='search'
                type="text"
                id="search"
                value={search}
                onChange={handleOnchange}
                autoComplete='off'
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por misión..."
            />
            {
                missions.length > 0
                &&
                <div className='absolute mt-10 overflow-hidden bg-white rounded-lg shadow-lg top-0 left-0 border border-gray-200 z-10'>
                    {
                        missions.map(({ mission }, index) => (
                            <section key={index}>
                                <Item mission={mission} />
                            </section>
                        ))
                    }
                </div>
            }
        </div>


    )
}

const Item = ({ mission }) => {
    const { missionData: { media: { images }, missionName } } = mission
    const image = images[0]?.url
    return (
        <div className='hover:bg-blue-200 flex gap-4 p-4'>
            <img src={image} className='w-8 h-8 rounded-full object-contain' alt='image_mission' />
            <div>
                <h3 className='text-sm font-semibold'>{missionName}</h3>
            </div>

        </div>
    )
}