import dayjs from "dayjs";
import { Link } from 'react-router-dom'
import Icon from "../Icon";


dayjs.locale("es");


export const Table = ({ displayCaptures = [], columns = [{ title: "Nombre", field: "User_name" }] }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#aeb8d4] dark:text-gray-700 text-center'>
                    <tr>
                        {
                            columns.map((item, index) => {
                                return (
                                    <th scope="col" className="px-6 py-3 " key={'head' + index}>
                                        {
                                            (item.title === 'photo' || item.title === 'Ver más')
                                                ? <span className="sr-only">{item.title}</span>
                                                : item.title

                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody >
                    {
                        displayCaptures
                        &&
                        displayCaptures.map((item, i) => {

                            const capture = item
                            return (<tr className="bg-white border-b dark:bg-[#6173aa] dark:border-gray-700 hover:bg-blue-900  hover:text-gray-900 text-center" key={i + 'ed'} >
                                {
                                    columns.map((element, index) => {
                                        if (element.subField) {

                                            return (

                                                (capture[element.field][element.subField].includes('http'))
                                                    ?
                                                    <td scope="row" className='flex px-2 py-4 font-medium text-white dark:text-gray-900 whitespace-nowrap  items-center justify-center ' key={index + 'key'}>
                                                        <img src={capture[element.field][element.subField]} className='rounded-full w-8 h-8' />
                                                    </td>
                                                    :
                                                    <td scope="row" className='px-6 py-4 font-medium text-gray-900  dark:text-white whitespace-nowrap' key={index + 'key'} >
                                                        {
                                                            element.title === 'fecha'
                                                                ? dayjs(capture.date.seconds * 1000).format('ddd, MMM D, YYYY h:mm A')
                                                                : capture[element.field][element.subField]
                                                        }

                                                    </td>


                                            )

                                        } else {
                                            return (

                                                <td scope="row" className={`px-6 py-4 font-medium  ${element.title === 'Ver más' && 'text-blue-900 dark:text-[#5F9E] hover:text-green-200 underline cursor-pointer '} ${statusColor[capture[element.field]] || 'dark:text-white'} ${element.title === 'Estado' && 'justify-center items-center flex'}  whitespace-nowrap`} key={index + 'key'} >
                                                    {
                                                        element.title === 'Misión'
                                                            ? capture?.missionData?.missionName || 'Captura libre'
                                                            : element.title === 'Ver más'
                                                                ? <Link to={'/captures/' + capture.id}>
                                                                    Ver más
                                                                </Link>
                                                                : element.title === 'Estado'
                                                                    ? <div className="bg-white rounded-full w-8 h-8 justify-center items-center flex">
                                                                        <Icon
                                                                            name={`${statusIcon[capture[element.field]] || 'free'}`}
                                                                            style='w-8 h-8 rounded-full'
                                                                            color={colorIcon[capture[element.field]] || 'red'} />
                                                                    </div>
                                                                    : capture[element.field]
                                                    }
                                                </td>
                                            )
                                        }
                                    })
                                }
                            </tr>

                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

const colorIcon = {
    Rejected: 'red',
    Accepted: 'green',
    Pending: 'orange',
    Appeal: 'orange'
}

const statusColor = {
    Rejected: 'text-red-900 dark:text-red-900  hover:text-red-500',
    Accepted: 'text-green-900 dark:text-green-900  hover:text-green-500',
    Pending: 'text-orange-800 dark:text-orange-800 hover:text-orange-500',
    Appeal: 'text-orange-800 dark:text-orange-800 hover:text-orange-500',
}
const statusIcon = {
    Rejected: 'close',
    Accepted: 'check',
    Pending: 'time',
    Appeal: 'time',
}