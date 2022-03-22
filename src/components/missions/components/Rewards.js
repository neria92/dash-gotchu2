import React from 'react'
import { useForm } from '../../../hooks/useForm'

export const Rewards = () => {
    const [{ }, onChange] = useForm({
        money: '',
        gCoins: '',
        xp: ''
    })

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <fieldset>
                                    <div>
                                        <legend className="text-base font-medium text-gray-900">Recopensas</legend>
                                    </div>
                                    <Input
                                        title={'Money'}
                                        name='money'
                                        placeHolder='Money'
                                    />
                                    <Input
                                        title={'Gcoins'}
                                        name='gcoins'
                                        placeHolder='Gcoins'
                                    />
                                    <Input
                                        title={'Puntos de experiencia'}
                                        name='Xp'
                                        placeHolder='xp'
                                    />
                                </fieldset>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {/* <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </>

    )
}

const Input = ({ title, name, placeHolder }) => {
    return (
        <div className="flex items-center">
            <label className='mr-1'>{`${title}: `}</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    type="text"
                    name={name}
                    id={title}
                    // onChange={onChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder={placeHolder}
                />
            </div>
        </div>
    )
}