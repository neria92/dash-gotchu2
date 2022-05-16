import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig'
import { Searcher } from './Searcher'


export const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        db.collection('users2')
            .limit(8)
            .get()
            .then((querySnapshot) => {
                setUsers(querySnapshot.docs.map(doc => ({ ...doc.data().userData, id: doc.id })));
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <div className='flex flex-col bg-transparent w-full rounded items-center justify-center'>
                        <div className='spinner'></div>
                        <span className='text-ellipsis font-semibold mt-5 text-gray-300'>Cargando...</span>
                    </div>
                    :
                    <div id='container' className='max-w-3xl p-5 mx-auto mt-10  bg-[#2F4F4F]  rounded shadow-2xl  col-span-2 grid grid-cols-2 md:grid-cols-3 gap-1' >
                        <div className=" w-full  col-span-2 md:col-span-1 p-5">
                            <Searcher />
                        </div>
                        <div className="max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-[#2F4F4F] dark:border-[#2F4F4F] col-span-2 items-center justify-center flex flex-col  p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios Gotchu!</h5>
                                {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a> */}
                            </div>
                            <div className="flow-root w-full">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-[#e6e9e9]">
                                    {
                                        users.map((item) => <User user={item} key={item.id} />)
                                    }

                                </ul>
                            </div>
                        </div>

                    </div>
            }
            <br />
        </>

    )
}

const User = ({ user }) => {
    const name = user.username
    const photo = user.photo
    const email = user.email

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={photo} alt={name} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {email}
                    </p>
                </div>
                <Link className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white" to={`/users/${user.id}`}>
                    ver más
                </Link>
            </div>
        </li>
    )
}