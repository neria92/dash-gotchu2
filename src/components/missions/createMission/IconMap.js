import React, { useContext, useState } from 'react'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from "@firebase/storage";

import { CreatMissionContext } from './context/CreatMissionContext';

export const IconMap = () => {
    const { mission } = useContext(CreatMissionContext);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700"> Icon Map </label>
            <div className="w-full h-56 md:w-1/3 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md snap-x overflow-hidden ">
                <div className="space-y-1 text-center">
                    {
                        mission?.missionData?.iconMap
                            ? <ImagePreview />
                            : <UpLoadImage />
                    }
                </div>
            </div>
        </div>
    )
}


const UpLoadImage = () => {

    const [pross, setPross] = useState(0);
    const { mission, setMission } = useContext(CreatMissionContext);
    const time = new Date()
    const handleFireBaseUpload = e => {

        let result = ''

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                result = e.target.result;
            };
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            const storage = getStorage();
            const storageRef = ref(storage, `iconsMap/${time.getTime() + '' + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, "data_url");

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPross(`Subiendo en ${progress}% `);

                },
                (error) => {
                    // Handle unsuccessful uploads
                    throw error;
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setMission({ ...mission, missionData: { ...mission.missionData, iconMap: downloadURL } })
                        setPross(0);

                    });
                }
            );
        }

    }



    return (
        <>

            <div className="flex text-sm text-gray-600">
                {
                    pross === 0
                        ?
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" />
                            </svg>
                            <input
                                id="uri"
                                name="uri"
                                type="file"
                                onChange={handleFireBaseUpload}
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 outline-none focus:outline-none focus:border-transparent dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400"
                            />

                        </label>
                        :
                        <div className='flex flex-col bg-transparent rounded items-center justify-center'>
                            <div className='spinner'></div>
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>{pross}</span>
                            </label>
                        </div>

                }
            </div>

        </>
    )
}



const ImagePreview = () => {
    const { mission } = useContext(CreatMissionContext)

    const iconMap = mission?.missionData?.iconMap
    return (
        <section className='flex gap-4 p-4 w-full snap-x overflow-x-auto'>

            {
                [iconMap].map(item => {
                    console.log('item',item)
                    return (
                        <div className='bg-green-500 shrink-0 w-2/5 overflow-hidden rounded shadow-lg justify-center items-center' key={item}>
                            <img alt="Placeholder" className="aspect-video object-cover" src={item} loading='lazy' />
                        </div>
                    )
                })
            }
        </section>
    )
}