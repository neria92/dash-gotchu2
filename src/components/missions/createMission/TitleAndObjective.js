import React, { useState } from 'react'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from "@firebase/storage";
import { useContext } from 'react';
import { CreatMissionContext } from './context/CreatMissionContext';
import { IconMap } from './IconMap';




export const TitleAndObjective = () => {

    const { mission, setMission } = useContext(CreatMissionContext);



    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, [target.name]: value } })

    }


    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    {/* <form onSubmit={next}> */}
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700"> Titulo </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="missionName"
                                            id="missionName"
                                            onChange={onChangeValues}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Titulo de misión" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Descripción </label>
                                <div className="mt-1">
                                    <textarea
                                        id="missionDescription"
                                        name="missionDescription"
                                        rows="3"
                                        onChange={onChangeValues}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="ingrese descripción"></textarea>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Descripción de que se trata la misión</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Objetivo </label>
                                <div className="mt-1">
                                    <textarea
                                        id="missionObjetive"
                                        name="missionObjetive"
                                        rows="3"
                                        onChange={onChangeValues}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="ingrese objetivo"></textarea>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Objetivo de la misión, que es lo que tiene que hacer el usuario</p>
                            </div>

                         
                        </div>
                    
                    </div>
                    {/* </form> */}
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

