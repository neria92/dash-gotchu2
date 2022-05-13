import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react';
import Icon from '../../Icon';
import { UserContext } from '../context/UserContext';
import { updateStatus } from '../helpers/updateStatus';


export const ChangeStatus = ({ status, capture }) => {
    const { captures, setCaptures } = useContext(UserContext);

    const onChange = (value) => {
        if (value === status) return
        const newCaptures = captures.map(item => {
            if (item.id === capture.id) {
                item['status'] = value
            }
            return item
        })
        setCaptures(newCaptures)
        updateStatus({ status: value, captureId: capture.id, mission: capture.missionData, userId: capture.userData.userId })
    }

    return (
        <Menu as='div' >
            <div>
                <Menu.Button className='flex items-center text-sm rounded-full hover:opacity-80'>
                    {statusMessage[status]}
                    <Icon
                        name='down'
                        style='w-4 h-4'
                        color='white'
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
                <Menu.Items className='absolute block right-50 w-36 mt-1 origin-to-rigth bg-white 
                 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
                 focus:outline-none z-10'>

                    <Menu.Item >
                        {({ active }) => (
                            <button
                                onClick={() => onChange('Accepted')}
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
                                    name='check'
                                    style='w-4 h-4'
                                    color='green'
                                />
                                Aceptar
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item >
                        {({ active }) => (
                            <button
                                onClick={() => onChange('Rejected')}
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
                                    name='close'
                                    style='w-4 h-4'
                                    color={'red'}
                                />
                                Rechazar
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


const statusMessage = {
    Pending: 'Pendiente',
    Accepted: 'Aceptada',
    Rejected: 'Rechazada',
    Appeal: 'Proceso de apelación'
}