import React from 'react'

export const Spinner = () => {
    return (
        <div className='min-h-screen flex justify-center items-center '>
            <div className='loader bg-white p-5 rounded-full flex space-x-3'>
                <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce '></div>
                <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce '></div>
                <div className='w-5 h-5 bg-gray-800 rounded-full animate-bounce '></div>
            </div>
        </div>
    )
}

export const SpinnerRounded = () => {
    return (
        <div className='flex flex-col bg-transparent w-full rounded items-center justify-center '>
            <div className='spinner'></div>
            
        </div>
    )
}