import React from 'react'

export const Search = ({ onChangeSearch }) => {
    return (
        <form className='justify-center mb-10 '>
            <div className='flex relative p-1 bg-gradient-to-tr from-blue-200 to-blue-50 rounded-full w-2/6 md:w-full'>
                <input
                    className='flex-1 p-2 pl-4 rounded-full w-full'
                    type='text'
                    placeholder='Busca lugar'
                    onChange={onChangeSearch}
                />
            </div>
        </form>
    )
}
