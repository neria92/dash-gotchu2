import React from 'react'
import dayjs from "dayjs";

export const Captures = ({ columns = [{}], data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">

            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#aeb8d4] dark:text-gray-700 text-center'>
                    <tr>
                        {
                            columns.map((item, index) => {
                                return (
                                    <th scope="col" className="px-6 py-3 " key={'head' + index}>
                                        {
                                            (item.title === 'photo')
                                                ? <span className="sr-only">{item.title}</span>
                                                : item.title

                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                        &&
                        data.map((item, i) => {

                            return (
                                <tr className="bg-white border-b dark:bg-[#6173aa] dark:border-gray-700 hover:bg-blue-900  hover:text-gray-900 text-center" key={i + 'ed'} >
                                    {
                                        columns.map((element, index) => {

                                            return (
                                                (!!item?.[element.field]?.[element.subField])
                                                    ?
                                                    (item[element.field][element.subField].includes('http'))
                                                        ?
                                                        <td scope="row" className='flex px-2 py-4 font-medium text-white dark:text-gray-900 whitespace-nowrap  items-center justify-center ' key={index + 'key'}>
                                                            <img src={item[element.field][element.subField]} className='rounded-full w-8 h-8' />
                                                        </td>
                                                        :
                                                        <td scope="row" className='px-6 py-4 font-medium text-gray-900  dark:text-white whitespace-nowrap' key={index + 'key'} >
                                                            {item[element.field][element.subField]}
                                                        </td>
                                                    :
                                                    <td scope="row" className='px-6 py-4 font-medium text-gray-900  dark:text-white whitespace-nowrap' key={index + 'key'} >
                                                        {
                                                            element.title === 'Fecha'
                                                                ? dayjs(item.date.seconds * 1000).format('ddd, MMM D, YYYY h:mm A')
                                                                :
                                                                element.title === 'Monto'
                                                                    ? item.missionData.loot.money
                                                                    : item[element.field]
                                                        }
                                                    </td>


                                            )


                                        })
                                    }
                                </tr>

                            )
                        })
                    }
                </tbody >

            </table>


        </div>
    )
}
