import React, { useEffect,useReducer,useState } from 'react'
import { getUserLocation } from '../../helpers/getUserLocation'
import { DateMission } from './components/DateMission'
import { Difficulty } from './components/Difficulty'
import { Map } from './components/Map'
import { Rewards } from './components/Rewards'
import { TitleAndObjective } from './components/TitleAndObjective'
import { TypeEvidences } from './components/TypeEvidences'
import { missionDataReducer } from './reducers/missionDataReducer'

export const CreateMission = () => {

    const [userPosition, setuserPosition] = useState([19.4337585,-99.1454316])
    const [missionData, dispatch] = useReducer(missionDataReducer, {});
    
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
