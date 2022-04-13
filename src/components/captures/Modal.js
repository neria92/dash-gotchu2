import React, { useState } from 'react'
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
} from "@firebase/storage";
import Swal from "sweetalert2";
import { db } from '../../firebase/firebaseConfig';


export const Modal = ({ setIsOpenModal, capture, setCaptures }) => {

    const time = new Date()
    const { missionData: { missionName } } = capture
    const [progress, setProgress] = useState(0);
    const [imageUpload, setImageUpload] = useState(null)


    const onChangePay = () => {

        if (!imageUpload) {
            Swal.fire(
                "Lo sentimos",
                'Es necesario que tenga el ticket de pago',
                "error"
            );
            return
        }
        if (capture.status === 'Pending' || capture.status === 'Rejected') {

            Swal.fire({
                title: 'Lo sentimos',
                text: "Es necesario primero que la captura sea aceptada",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setCaptures(prev => {
                        return prev.map(item => {
                            if (capture.id === item.id) {
                                item['status'] = 'Accepted'
                                return item
                            } else {
                                return item
                            }
                        })

                    })
                    Swal.fire(
                        'Captura aceptad',
                        'La Captura ya se ha aceptado',
                        'success'
                    )
                }
            })
            return
        }
        setCaptures(prev => {
            return prev.map(item => {
                if (capture.id === item.id) {
                    item['payOut'] = true
                    return item
                } else {
                    return item
                }
            })

        })
        db.collection('captures2').doc(capture.id).update({
            datepay: new Date(),
            payOut: true,
            ticketImage: imageUpload,
            status:'Accepted'
        })
        setIsOpenModal(false)
    }
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
            const storageRef = ref(storage, `pays/gotchu/${time.getTime() + '' + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, "data_url");

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(`Subiendo en ${progress}% `);

                },
                (error) => {
                    throw error;
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUpload(downloadURL)
                        setProgress(0);

                    });
                }
            );
        }

    }


    return (
        <div id="small-modal" tabIndex="-1" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                <div className="relative bg-white rounded-lg shadow dark:bg-[#AEB8D4]">

                    <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Pagar misión {missionName}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="small-modal" onClick={() => setIsOpenModal(prev => !prev)}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">

                        {
                            imageUpload
                                ?
                                <img src={imageUpload} className='shrink-0 object-cover block h-auto w-full bg-cover' />
                                :
                                progress === 0
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
                                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        />
                                    </label>
                                    :
                                    <div className='flex flex-col bg-transparent rounded items-center justify-center'>
                                        <div className='spinner'></div>
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>{progress}</span>
                                        </label>
                                    </div>

                        }
                    </div>

                    <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button data-modal-toggle="small-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={onChangePay}>Pagar</button>
                        <button data-modal-toggle="small-modal" type="button" className="text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-red-700 dark:text-white dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600" onClick={()=>setIsOpenModal(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
