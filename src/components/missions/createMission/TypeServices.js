import React, { useContext } from 'react'
import { useState } from 'react';
import { CreatMissionContext } from './context/CreatMissionContext';

const typeServices = {
    ubicacion: 'location',
    tiempo: 'time'
}
export const TypeServices = () => {


    const { mission, setMission } = useContext(CreatMissionContext);

    const [checkboxValues, setCheckboxValues] = useState({
        ubicacion: false,
        tiempo: false,
    });

    const onChange = (e) => {

        const newValues = { ...checkboxValues };
        newValues[e.target.name] = !checkboxValues[e.target.name];
        setCheckboxValues(newValues);
        if (!checkboxValues[e.target.name]) {
            if (mission?.missionData?.services) {
                setMission({ ...mission, missionData: { ...mission.missionData, services: [...mission?.missionData?.services, typeServices[e.target.name]] } })
            } else {
                setMission({ ...mission, missionData: { ...mission.missionData, services: [typeServices[e.target.name]] } })
            }
        } else {
            setMission({ ...mission, missionData: { ...mission.missionData, services: [...mission.missionData.services].filter(service => service !== typeServices[e.target.name]) } })
        }
    }
    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className=" bg-white space-y-6 sm:p-6 px-4 py-5">
                                <fieldset>
                                    <legend className="text-base font-medium text-gray-900">Sevicios</legend>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="tiempo"
                                                    name="tiempo"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={onChange}
                                                    value={checkboxValues.tiempo}
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="font-medium text-gray-700">Tiempo</label>

                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="ubicacion"
                                                    name="ubicacion"
                                                    type="checkbox"
                                                    onChange={onChange}
                                                    value={checkboxValues.ubicacion}
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="font-medium text-gray-700">Ubicación</label>
                                                {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
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


