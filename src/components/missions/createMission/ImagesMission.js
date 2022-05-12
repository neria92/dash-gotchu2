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




export const ImagesMission = () => {

    const { mission, setMission } = useContext(CreatMissionContext);



    const onChangeValues = ({ target }) => {
        const value = target.value
        setMission({ ...mission, missionData: { ...mission.missionData, [target.name]: value } })

    }


    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <legend className="text-base font-medium text-gray-900">Imagenes</legend>



                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Imagen de misión </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md snap-x overflow-hidden ">
                                    <div className="space-y-1 text-center">
                                        {
                                            mission?.missionData?.media?.images.length > 0
                                                ? <ImagePreview />
                                                : <UpLoadImage />
                                        }
                                    </div>
                                </div>
                            </div>
                            <IconMap />

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
const ImagePreview = () => {
    const { mission } = useContext(CreatMissionContext)

    const { images } = mission?.missionData?.media

    return (
        <section className='flex gap-4 p-4 w-full snap-x overflow-x-auto'>
            <AddNewImage />
            {
                images?.map(item => {

                    return (
                        <div className=' shrink-0 w-2/5 overflow-hidden rounded shadow-lg justify-center items-center' key={item.url}>
                            <img alt="Placeholder" className="aspect-video object-cover" src={item.url} loading='lazy' />
                        </div>
                    )
                })
            }
        </section>
    )
}

const AddNewImage = () => {
    const { mission, setMission } = useContext(CreatMissionContext);
    const [pross, setPross] = useState(0);
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
            const storageRef = ref(storage, `missions2/gotchu/${file.name}`);
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
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setMission({ ...mission, missionData: { ...mission.missionData, media: { images: [...mission?.missionData?.media?.images, { url: downloadURL }] } } })

                        setPross(0);

                    });
                }
            );
        }

    }



    return (
        <div className='bg-white- shrink-0 w-1/5 overflow-hidden rounded shadow-lg justify-center items-center'>
            <svg className="flex mt-10 mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" />
            </svg>
            <div className="flex justify-center items-center text-sm text-gray-600">
                {
                    pross === 0
                        ?
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">

                            <input
                                id="uri"
                                name="uri"
                                type="file"
                                onChange={handleFireBaseUpload}
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

        </div>
    )
}

const UpLoadImage = () => {

    const [pross, setPross] = useState(0);
    const { mission, setMission } = useContext(CreatMissionContext);

    const handleFireBaseUpload = e => {


        if (e.target.files && e.target.files[0]) {
            let result = ''
            let reader = new FileReader();
            reader.onload = (e) => {
                result = e.target.result;
            };
            const file = e.target.files[0];
            reader.readAsDataURL(file);
            const storage = getStorage();
            const storageRef = ref(storage, `missions2/gotchu/${file.name}`);
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

                        setMission({ ...mission, missionData: { ...mission.missionData, media: { images: [{ url: downloadURL }] } } })
                        setPross(0);

                    });
                }
            );
        }

    }



    return (
        <>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" />
            </svg>
            <div className="flex text-sm text-gray-600">
                {
                    pross === 0
                        ?
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <input
                                id="uri"
                                name="uri"
                                type="file"
                                onChange={handleFireBaseUpload}
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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


