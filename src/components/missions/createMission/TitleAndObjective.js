import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'


export const TitleAndObjective = ({ missionData, setMissionData }) => {

    const [images, setImages] = useState(missionData?.images || []);

    const [{ title, objective, }, onChange] = useForm({
        title: missionData?.title || '',
        objective: missionData?.objective || '',
    })



    const next = () => {
        setMissionData(prev => {
            return { ...prev, objective, title, images }
        })
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
                                            name="title"
                                            id="title"
                                            onChange={onChange}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Titulo de misión" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700"> Descripción </label>
                                <div className="mt-1">
                                    <textarea
                                        id="objective"
                                        name="objective"
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
                            {/* <button
                                onClick={next}
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                            </button> */}
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
                        <div className='bg-green-500 shrink-0 w-2/5 overflow-hidden rounded shadow-lg justify-center items-center'>
                            <img alt="Placeholder" className="aspect-video object-cover" src={uri} loading='lazy' />
                        </div>
                    )
                })
            }
        </section>
    )
}

const AddNewImage = ({ setImages }) => {

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setImages(prev => [...prev, reader.result])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className="flex items-end justify-end text-sm text-gray-600 ">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>
                    otra imagen</span>
                <input
                    id="uri"
                    name="uri"
                    type="file"
                    onChange={imageHandler}
                    className="sr-only"
                />
            </label>
        </div>
    )
}

const UpLoadImage = ({ setImages }) => {

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setImages(prev => [...prev, reader.result])
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" />
            </svg>
            <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Agregar imagen</span>
                    <input
                        id="uri"
                        name="uri"
                        type="file"
                        onChange={imageHandler}
                        className="sr-only"
                    />
                </label>
                {/* <p className="pl-1">or drag and drop</p> */}
            </div>

        </>
    )
}