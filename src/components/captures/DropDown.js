import React, { useRef, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import Icon from '../Icon';


export const DropDown = () => {



    return (
        <Menu as='div' >
            <div>
                <Menu.Button className='flex items-center text-sm rounded-full hover:opacity-80'>
                    
                    <Icon
                        name='pencil'
                        style='w-8 h-8'
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
                <Menu.Items className='absolute block right-0 md:right-auto w-36 mt-4 origin-to-rigth bg-white 
             divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
             focus:outline-none z-10'>

                    <Menu.Item >
                        {({ active }) => (
                            <button
                                // onClick={handleLogout}
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
                                    name='exit'
                                    style='w-4 h-4'
                                />
                                Editar
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item >
                        {({ active }) => (
                            <button
                                // onClick={handleLogout}
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
                                    name='exit'
                                    style='w-4 h-4'
                                />
                                Ocultar
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item >
                        {({ active }) => (
                            <button
                                // onClick={handleLogout}
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
                                    name='exit'
                                    style='w-4 h-4'
                                />
                                Aceptar/rechazar
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
