import React from 'react'
import Icon from '../Icon'

export const MessageNotAppeal = () => {
    return (
        <div className="shadow-lg mt-20 flex  flex-wrap w-full lg:w-4/6 mx-auto bg-white rounded mb-8">
            <div className="flex flex-col items-center justify-center max-w-sm w-full lg:max-w-full lg:flex">
                <Icon
                    name='check'
                    color={'green'}
                    style='w-32 h-32'
                />
                <div className="text-blue-900 font-bold text-xl mb-8 "> No hay apelaciones por revisar</div>

            </div>
            
        </div>
    )
}
