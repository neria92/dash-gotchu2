import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { Menu } from './Menu'
import { Table } from './Table'

export const Captures = () => {

    const [captures, setCaptures] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [typeEvidences, setTypeEvidences] = useState('all');

    useEffect(() => {
        setIsLoading(true)
        if (typeEvidences === 'all') {
            db.collection('captures2').orderBy('date', 'desc').limit(50).get().then((querySnapshot) => {
                setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
                .finally(() => setIsLoading(false))
        } else {
            db.collection('captures2').where('status', '==', typeEvidences).orderBy('date', 'desc').limit(50).get().then((querySnapshot) => {
                setCaptures(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
                .finally(() => setIsLoading(false))
        }
    }, [typeEvidences])


    return (
        <div>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center mt-32'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    <>
                        <Menu
                            selectType={typeEvidences}
                            setSelectType={setTypeEvidences}
                        />
                        <div className=' p-10'>
                            <Table
                                displayCaptures={captures}
                                columns={[
                                    { title: 'photo', field: 'userData', subField: 'photo' },
                                    { title: 'Usuario', field: 'userData', subField: 'username' },
                                    { title: 'fecha', field: 'userData', subField: 'username' },
                                    { title: 'Estado', field: 'status' },
                                    { title: 'Misión', field: 'missionData' },
                                    { title: 'Ver más' },
                                ]}

                            />
                        </div>
                    </>

            }
        </div>
    )
}
