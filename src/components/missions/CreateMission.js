import React, { useEffect,useState } from 'react'
import { getUserLocation } from '../../helpers/getUserLocation'
import { DateMission } from './createMission/DateMission'
import { Difficulty } from './createMission/Difficulty'
import { Map } from './createMission/Map'
import { Rewards } from './createMission/Rewards'
import { TitleAndObjective } from './createMission/TitleAndObjective'
import { TypeEvidences } from './createMission/TypeEvidences'

export const CreateMission = () => {

    const [userPosition, setuserPosition] = useState([19.4337585,-99.1454316])
    useEffect(() => {
        getUserLocation().then((res)=>setuserPosition(res))
    }, [])

    return (
        <div >
            <TitleAndObjective />

            <Difficulty />

            <DateMission />

            <Rewards />

            <Map
                userPosition={userPosition}
            />

            <TypeEvidences />


        </div>
    )
}
