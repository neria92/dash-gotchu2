import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router'
import { db } from '../../firebase/firebaseConfig'
import { UserCard } from './UserCard'
import { FinancialInformation } from './FinancialInformation'
import { StatsUser } from './StatsUser'

export const UserDetails = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        db.collection('users2').doc(id).get()
            .then((doc) => {
                if (doc.exists) { setUser({ ...doc.data(), id: doc.id }) }
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        isLoading
            ? null
            :
            <>
                <div className='max-w-5xl p-5 mx-auto mt-10  rounded  col-span-2 grid grid-cols-2 md:grid-cols-3 gap-1' >

                    <div className=" md:w-11/12 w-full  col-span-2 md:col-span-1 ">
                        <UserCard userData={user?.userData} />
                        <StatsUser userData={user?.userData} />
                    </div>

                    <div className="w-full bg-white rounded-lg border shadow-md sm:p-2 dark:bg-[#2F4F4F] dark:border-[#2F4F4F] col-span-2  justify-center flex flex-col">
                        <FinancialInformation financialInformation={user?.financialInformation} />
                    </div>

                </div>
                <div id='pagos' className='max-w-5xl p-5 mx-auto mt-10  rounded bg-white'>
s
                </div>
            </>

    )
}
