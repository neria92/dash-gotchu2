import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { AppealCard } from './AppealCard';
import { Menu } from './Menu';
import { MessageNotAppeal } from './MessageNotAppeal';


export const Appeal = () => {

    const [appeals, setAppeals] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [selectTypeAppeal, setSelectTypeAppeal] = useState('process')
    useEffect(() => {
        setIsLoading(true)
        db.collection('appeal').where('status', '==', selectTypeAppeal).orderBy('date', 'desc').get().then((querySnapshot) => {
            setAppeals(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
            .finally(() => setIsLoading(false))
    }, [selectTypeAppeal])



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
                            selectTypeAppeal={selectTypeAppeal}
                            setSelectTypeAppeal={setSelectTypeAppeal}
                        />
                        {

                            appeals.length === 0
                                ? <MessageNotAppeal />
                                :
                                appeals.map((appeal) => {

                                    return <AppealCard
                                        appeal={appeal}
                                        key={appeal.id}
                                    />
                                })
                        }
                    </>
            }
        </div>
    )
}
