import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { Searcher } from './Searcher'
import { UserCard } from './UserCard';

export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        db.collection('users2')
            .limit(5)
            .get()
            .then((querySnapshot) => {
                setUsers(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (

        <div className='mx-5 md:mx-40 mt-10 animate__animated animate__fadeIn  rounded shadow-2xl shadow-blue-600 col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3' >
            <div className=" w-full col-span-2 md:col-span-1 p-5">
                <Searcher />
            </div>
            <div className="col-span-2 items-center justify-center flex flex-col  p-5">
                {
                    users.map((item, index) => (

                        <UserCard item={item} key={index}/>
                    ))
                }

            </div>
        </div>
    )
}
