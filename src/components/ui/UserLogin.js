import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import Icon from '../Icon';

export const UserLogin = () => {
    const { photoURL, name } = useSelector(state => state.auth)

    return (
        <Menu as='div' className='relative ml-3 '>

            <div>
                <Menu.Button className='flex items-center text-sm rounded-full hover:opacity-80'>
                    <span className='sr-only'> Abrir preferencias</span>
                    <img
                        className='w-8 h-8 rounded-full'
                        alt=''
                        src={photoURL}
                    />
                    <span className='ml-2 font-semibold'>{name}</span>
                    <Icon
                        name='down'
                        style='w-4 h-4'
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
                leaveTo='opacity-0 scale-95'
            >
                <Menu.Items>
                    <Menu.Item className='absolute block right-0 w-36 mt-2 origin-to-rigth bg-white 
                divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
                focus:outline-none z-10'>
                        {
                            ({ isActive }) => {
                                <button
                                    onClick={() => console.log('s')}
                                    className={
                                        `${isActive
                                            ? 'bg-yellow-300 '
                                            : ''
                                        } 
                                    group flex gap-1 rounded-sm items-center w-full px-4 py-2
                                    text-sm text-gray-900 font-semibold
                                    `
                                    }
                                >
                                    cerrar sesion
                                </button>


                            }
                        }

                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu >
    )

}
