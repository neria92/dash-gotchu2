import React, { useRef, Fragment,useContext } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { db } from '../../firebase/firebaseConfig'
import { EditCaptureContext } from './context/EditCaptureContext'
import Icon from '../Icon';


export const DropDown = () => {
    const { capture,setCapture} = useContext(EditCaptureContext);

   
    const handleHide = () => {
        setCapture({ ...capture, hide: !capture.hide })
        db.doc(`captures2/${capture.id}`).update({
            hide: !capture.hide
        })

    }

    return (
        <Menu as='div' >
            <div>
                <Menu.Button className='flex items-center text-sm rounded-full hover:opacity-80'>

                    <Icon
                        name='settings'
                        style='w-8 h-8'
                        color='#fff'
                    />

                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='opacity-100 scale-100'
            >
                <Menu.Items className='absolute block right-0 md:right-auto w-36 mt-2 origin-to-rigth bg-gray-300
             divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
             focus:outline-none z-10'>

                    <Button
                        name={!capture.hide ? 'eyeClosed' : 'eyeOpen'}
                        title={!capture.hide ? 'ocultar' : 'mostrar'}
                        onClick={handleHide}
                    />
                </Menu.Items>
            </Transition>
        </Menu>
    )
}



const Button = ({ name, onClick, title }) => {
    return (
        <Menu.Item >
            {({ active }) => (
                <button
                    onClick={onClick}
                    className={
                        `${active
                            ? 'bg-blue-300 rounded-sm'
                            : ''
                        } 
             group flex gap-1 rounded-sm items-center w-full px-4 py-2
             text-sm text-gray-900 font-semibold
             `
                    }
                >
                    <Icon
                        name={name}
                        style='w-4 h-4'
                    />
                    {title}

                </button>
            )}
        </Menu.Item>
    )
}