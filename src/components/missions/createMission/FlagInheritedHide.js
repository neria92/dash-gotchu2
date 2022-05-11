import React, {useState,useContext } from 'react'

import { CreatMissionContext } from './context/CreatMissionContext';

export const FlagInheritedHide = () => {

    const { mission, setMission } = useContext(CreatMissionContext);

    const [checkboxValues, setCheckboxValues] = useState(false);

    const onChange = () => {
        setCheckboxValues(!checkboxValues)
        setMission({ ...mission, inheritedHide: !checkboxValues })
    }
    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className=" bg-white space-y-6 sm:p-6 px-4 py-5">
                                <fieldset>
                                    <legend className="text-base font-medium text-gray-900">Mostar capturas</legend>
                                    <div className="mt-4 space-y-4">

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="inheritedHide"
                                                    name="inheritedHide"
                                                    type="checkbox"
                                                    onChange={onChange}
                                                    value={checkboxValues}
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="font-medium text-gray-700">¿Quieres que se oculten las capturas?</label>
                                                <p className="text-gray-500">Cuando se active no se mostraran las capturas de esta misión</p>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                               


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



