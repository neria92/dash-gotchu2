import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../Icon';
import { startLogout } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

export const UserLogin = () => {

    const { photoURL, name } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(startLogout());
        navigate('/login')

    }

    return (
        <Menu as='div' >
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
            >
                <Menu.Items className='absolute block right-0 w-36 mt-4 origin-to-rigth bg-white 
                 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
                 focus:outline-none z-10'>

                    <Menu.Item >
                        {({ active }) => (
                            <button
                                onClick={handleLogout}
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
                                cerrar sesion
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


