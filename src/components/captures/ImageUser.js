import React from 'react'

export const ImageUser = ({ url }) => {
    return (
        <div className='h-8 w-8'>
            <img alt="user" className="block rounded-full" src={url} />
        </div>
    )
}
