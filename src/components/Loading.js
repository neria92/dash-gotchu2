import React from 'react'

export const Loading = ({ h, w, text = false, bg='bg-white' }) => {
    return (
        <div className={`flex flex-col bg-transparent h-${h} w-${w} ${bg} rounded items-center justify-center`}>
            <div className='spinner'></div>
            {text && <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>}
        </div>
    )
}
