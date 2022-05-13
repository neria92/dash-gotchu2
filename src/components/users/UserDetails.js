import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import dayjs from "dayjs";
import { db } from '../../firebase/firebaseConfig'
import { UserContext } from './context/UserContext'
import { UserCard } from './UserCard'
import { FinancialInformation } from './FinancialInformation'
import { StatsUser } from './StatsUser'
import { useSelector } from 'react-redux'
import { PaymentsCaptures } from './paymentsCaptures/PaymentsCaptures'

export const UserDetails = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const { isPaymentsCaptures } = useSelector(state => state.auth);

    const [user, setUser] = useState({});
    const [captures, setCaptures] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCaptures, setIsLoadingCaptures] = useState(true);
    const [startDate, setStartDate] = useState(dayjs().subtract(14, 'days').toDate())

    useEffect(() => {
        setIsLoading(true)
        db.collection('users2').doc(id).get()
            .then((doc) => {
                if (doc.exists) { setUser({ ...doc.data(), id: doc.id }) }
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (isPaymentsCaptures) {
            setIsLoadingCaptures(true);
            if (!user?.id) return
            (async () => {
                await db.collection('captures2')
                    .where('userData.userId', '==', user.id)
                    .where('date', '>=', startDate)
                    .orderBy('date', 'desc')
                    .get()
                    .then((querySnapshot) => {
                        let captures = []
                        querySnapshot.docs.forEach(doc => {
                            if (!doc.data()?.payOut && doc.data()?.missionData?.loot?.money >= 1) {
                                captures.push({ ...doc.data(), id: doc.id })
                            }
                        })
                        setCaptures(captures)
                    })
                    .finally(() => setIsLoadingCaptures(false))
            })()
        }
    }, [user])
    useEffect(() => {
        console.log('captures', captures)
    }, [captures])

    return (
        isLoading
            ? null
            :
            <UserContext.Provider value={{ user, setUser, captures, setCaptures }}>
                <div className='max-w-5xl p-5 mx-auto mt-5  rounded  col-span-2 grid grid-cols-2 md:grid-cols-3 gap-1 ' >

                    <div className=" md:w-11/12 w-full  col-span-2 md:col-span-1 ">
                        <UserCard userData={user?.userData} />
                        <StatsUser stats={user?.userData?.stats} />
                    </div>

                    <div className="w-full bg-white rounded-lg border shadow-md sm:p-2 dark:bg-[#2F4F4F] dark:border-[#2F4F4F] col-span-2  justify-center flex flex-col">
                        <FinancialInformation financialInformation={user?.financialInformation} />
                    </div>

                </div>
                {
                    (isPaymentsCaptures && !isLoadingCaptures)
                    &&
                    <PaymentsCaptures />
                }
                <br />
            </UserContext.Provider >

    )
}
