import React from 'react'
import Icon from '../Icon'



export default function ActiveToIndex({ currentIndex = 1, setCurrentIndex = () => { }, total = [0, 1, 2,] }) {
    return (

        <div className='flex  w-full  flex-row justify-center items-center'>
            {
                total.map((item, index) => {
                    return (
                        <div
                            key={index + 'start'}
                            onPress={() => setCurrentIndex(item)}
                            className='flex'
                        >
                            <Icon
                                name={item === currentIndex ? 'pointActive' : 'pointInactive'}
                                color={'bg-red-300'}
                                style='w-8 h-8 bg-white'
                            />

                        </div>
                    )
                })
            }
        </div>
    )
}

