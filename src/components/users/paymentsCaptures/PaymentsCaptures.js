import React, { useState, useContext } from 'react'
import { Modal } from '../../captures/Modal'
import { UserContext } from '../context/UserContext'
import { Captures } from './Captures'
import { Date } from './Date'

export const PaymentsCaptures = () => {
    const { captures, setCaptures } = useContext(UserContext)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const capturesAccepted = captures.filter(capture => capture.status === 'Accepted' && !capture.payOut )
    let total = 0
    for (let index = 0; index < capturesAccepted.length; index++) {
        const element = capturesAccepted[index];
        total = total + element.missionData.loot.money
    }

    return (
        <div div id='pagos' className='max-w-5xl p-5 mx-auto mt-10  rounded bg-[#2F4F4F]'>
            <Date />
            <Captures data={capturesAccepted} columns={columns} />
            {
                total > 0
                &&
                <TotalPay data={capturesAccepted} total={total} onChange={() => setIsOpenModal(prev => !prev)} />
            }
            <Captures data={captures.filter(capture => capture.status === 'Rejected')} columns={columns} />
            <Captures data={captures.filter(capture => capture.status === 'Pending')} columns={columns} />
            {
                isOpenModal
                &&
                <Modal
                    setIsOpenModal={setIsOpenModal}
                    totalPay={total}
                    captures={capturesAccepted}
                    setCaptures={setCaptures}
                    userToPay={capturesAccepted[0].userData.userId}
                />
            }
        </div>
    )
}




const columns = [
    { title: 'photo', field: 'userData', subField: 'photo' },
    { title: 'Nombre', field: 'userData', subField: 'username' },
    { title: 'Fecha', field: '', subField: '' },
    { title: 'Estado', field: 'status' },
    { title: 'Misión', field: 'missionData', subField: 'missionName' },
    { title: 'Ver más' },
    { title: 'Monto', field: 'missionData' },
]

const TotalPay = ({ data, onChange, total }) => {



    return (
        <div className='shadow-lg px-4 py-5  border-0 border-white sm:p-3d my-5'>
            <div className='flex flex-row justify-end items-center '>
                <h1 className='text-white font-semibold'>
                    Total a pagar
                </h1>
                <h1 className='ml-20 text-white font-semibold'>
                    ${total}
                </h1>
            </div>
            <div className='flex flex-row justify-end items-center mt-5'>

                <button
                    className=" px-4 py-2 font-bold text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onChange}
                >
                    pagar capturas
                </button>
            </div>
        </div>
    )
}