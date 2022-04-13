
import React, { useContext } from 'react'
import { distanceEarth } from '../../helpers/distancePoints'
import { EditCaptureContext } from './context/EditCaptureContext'
import {ChangeStatus} from './ChangeStatus'

export const UbicationIformation = () => {

    const { mission, capture } = useContext(EditCaptureContext);

    const { geoData: { coords: { latitude, longitude } } } = capture
    const latitudeMission = mission?.geoData?.latitude || latitude
    const longitudeMission = mission?.geoData?.longitude || longitude



    const distance = distanceEarth(latitudeMission, longitudeMission, latitude, longitude)
    return (

        <div className={`${!capture?.missionData && 'hidden'} h-80 w-full md:w-80 rounded my-10  p-2 md:p-5`}>
            <div className='flex  h-full w-full justify-center items-center'>
                
                <Data
                    distance={distance}
                    status={capture?.status}
                />
            </div>
        </div>

    )
}



const Data = ({distance,status}) => {
    return (
        <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-700 dark:text-gray-200">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Distancia
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {distance} km
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b dark:bg-blue-400 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-blue-400 even:dark:bg-blue-400 uppercase">
                        <th scope="row" className="px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap">
                            Estado
                        </th>
                        <td className="flex fels-row px-6 py-4 text-white">
                            
                            <ChangeStatus status={status}/>
                        </td>

                    </tr>
                    <tr className="border-b dark:bg-blue-700 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-blue-700 uppercase">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            Mensaje
                        </th>
                        <td className="px-6 py-4">
                            
                        </td>

                    </tr>



                </tbody>
            </table>
        </div>
    )
}

