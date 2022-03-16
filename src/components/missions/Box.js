import React from 'react'

export const Box = ({ image, title }) => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center py-10 border border-white-100 rounded shadow-lg
            shadow-pink-500 dark:md:hover:bg-blue-600 cursor-pointer '>
                <div className='w-4/5 rounded overflow-hidden shadow-lg'>
                    <img className='aspect-video object-cover' alt='image' src={image} loading='lazy'/>
                </div>
                <div className='mt-4 text-lg font-bold'>
                    {title}
                </div>
            </div>
        </div>
    )
}
