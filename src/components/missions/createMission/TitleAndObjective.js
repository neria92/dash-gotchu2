import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from "@firebase/storage";
import Swal from "sweetalert2";
import Icon from '../../Icon';




export const TitleAndObjective = ({ missionData, setMissionData,onReset }) => {

    const [images, setImages] = useState(missionData?.images || []);
    const [isCheck, setIsCheck] = useState(false);

    const [{ missionName, missionObjetive, }, onChange] = useForm({
        missionName: missionData?.missionName || '',
        missionObjetive: missionData?.missionObjetive || '',
    })

    useEffect(() => {
        onChange({
            target:{
                name:'missionName',
                value:''
            }
        })
        onChange({
            target:{
                name:'missionObjetive',
                value:''
            }
        })
        setImages([])
    }, [onReset])
    


    const next = () => {

        if (!missionName) {
            Swal.fire(
                "Error",
                "Ese necesario que tenga titulo la misión",
                "error"
            );
            return
        }

        if (!missionObjetive) {
            Swal.fire(
                "Error",
                "Ese necesario que tenga objetivo la misión",
                "error"
            );
            return
        }

        if (images.length === 0) {
            Swal.fire(
                "Error",
                "Ese necesario que tenga almenos una imagen la misión",
                "error"
            );
            return
        }
        setMissionData(prev => ({ ...prev, missionObjetive, missionName, images }))
        setIsCheck(true)
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
                                            onChange={onChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Titulo de misión" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Descripción </label>
                                <div className="mt-1">
                                    <textarea
                                        id="missionObjetive"
                                        name="missionObjetive"
                                        rows="3"
                                        onChange={onChange}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="ingrese descripción"></textarea>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Descripción de que se trata la misión</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Imagen de misión </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md snap-x overflow-hidden ">
                                    <div className="space-y-1 text-center">
                                        {
                                            images.length > 0
                                                ? <ImagePreview images={images} />
                                                : <UpLoadImage setImages={setImages} />
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                images.length > 0
                                &&
                                <AddNewImage setImages={setImages} />
                            }
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {
                                !isCheck
                                    ?
                                    <button
                                        onClick={next}
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Guardar
                                    </button>
                                    :
                                    <Icon
                                        style='w-12 h-12 bg-green-500 rounded inline-flex justify-center  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
                                        name='check'
                                        color='#fff'
                                    />
                            }
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
const ImagePreview = ({ images }) => {
    return (
        <section className='flex gap-4 p-4 w-full snap-x'>
            {
                images.map(uri => {
                    return (
                        <div className='bg-green-500 shrink-0 w-2/5 overflow-hidden rounded shadow-lg justify-center items-center' key={uri}>
                            <img alt="Placeholder" className="aspect-video object-cover" src={uri} loading='lazy' />
                        </div>
                    )
                })
            }
        </section>
    )
}

const AddNewImage = ({ setImages }) => {

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


                        setImages(prevObject => ([...prevObject, downloadURL]))
                        setPross(0)

                    });
                }
            );
        }

    }



    return (
        <div className="flex items-end justify-end text-sm text-gray-600 ">
            {
                pross === 0
                    ?
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>
                            otra imagen</span>
                        <input
                            id="uri"
                            name="uri"
                            type="file"
                            onChange={handleFireBaseUpload}
                            className="sr-only"
                        />
                    </label>
                    :
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        {pross}
                    </label>
            }
        </div>
    )
}

const UpLoadImage = ({ setImages }) => {

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


                        setImages(prevObject => ([...prevObject, downloadURL]));
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
                        <label label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Agregar imagen</span>
                            <input
                                id="uri"
                                name="uri"
                                type="file"
                                onChange={handleFireBaseUpload}
                                className="sr-only"
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


