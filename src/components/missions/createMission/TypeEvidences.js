import React, { useContext } from 'react'
import { useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
import Icon from '../../Icon';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { CreatMissionContext } from './context/CreatMissionContext';
import { validateData } from './validateData';

export const TypeEvidences = () => {

    const navigate = useNavigate()

    const { mission, setMission } = useContext(CreatMissionContext);
    const [isLoading, setIsLoading] = useState(false);

    const [checkboxValues, setCheckboxValues] = useState({
        photos: false,
        videos: false,
    });

    const [isCheck, setIsCheck] = useState(false);
    const onChange = (e) => {

        const newValues = { ...checkboxValues };
        newValues[e.target.name] = !checkboxValues[e.target.name];
        setCheckboxValues(newValues);
        setMission({ ...mission, missionData: { ...mission.missionData, typeEvidence: checkboxValues } })
    }



    const goNext = () => {
        setIsLoading(true);
        const [flag, error] = validateData(mission)
        if (flag) {
            Swal.fire(
                "Lo sentimos",
                error,
                "error"
            );
            setIsLoading(false);
            return
        }
        const { missionData } = mission;
        const { missionName } = missionData

        const newMission = {
            ...mission,
            date: new Date(),
            missionData: {
                ...missionData,
                media: {
                    ...mission.missionData.media,
                    videos: [],
                },
                missionDescription: "",
            },
            userData,
            hide: false,
            fellows: [],
            viewers: [],
            groups: [],
            isPrivate: false,
        };
        
        db.collection("missions2").add(newMission).then((doc) => {
            if (doc.id) {

                Swal.fire(
                    "Listo",
                    `Se ha publicado la misión ${missionName}`,
                    "success"
                )
                setMission({})
                navigate('/missions')
                setIsCheck(true);
                setIsLoading(false);
            }

        }).catch(() => {
            Swal.fire(
                "Lo sentimos ocurrio un error inesperado",
                `Se ha publicado la misión ${missionName}`,
                "error"
            );
            setIsLoading(false);
        })

    };

    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className=" bg-white space-y-6 sm:p-6 px-4 py-5">
                                <fieldset>
                                    <legend className="text-base font-medium text-gray-900">Tipo de evidencia</legend>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="photos"
                                                    name="photos"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    onChange={onChange}
                                                    value={checkboxValues.photos}
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="font-medium text-gray-700">Fotos</label>

                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="videos"
                                                    name="videos"
                                                    type="checkbox"
                                                    onChange={onChange}
                                                    value={checkboxValues.videos}
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label className="font-medium text-gray-700">Videos</label>
                                                {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>


                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {
                                    !isCheck
                                        ?
                                        <button
                                            onClick={goNext}
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Crear misión
                                        </button>
                                        :
                                        isLoading
                                            ?
                                            <div className=' flex-col bg-transparent w-12 h-12  inline-flex rounded items-center justify-center'>
                                                <div className='spinner'></div>
                                                
                                            </div>
                                            :
                                            <Icon
                                                style='w-12 h-12 bg-green-500 rounded inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                                                name='check'
                                                color='#fff'
                                            />
                                }
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


const userData = {
    photo: 'https://firebasestorage.googleapis.com/v0/b/gchgame.appspot.com/o/GotchuBW.jpg?alt=media&token=c7441686-2e57-4d8f-b6f5-7c97a045d6bb',
    userDescription: 'Sígueme para enterarte de las misiones más recientes y así ganar con Gotchu!',
    userId: '0',
    username: 'Gotchu!'
}