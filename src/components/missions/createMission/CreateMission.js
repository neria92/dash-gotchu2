import React, { useEffect, useReducer, useState } from 'react'
import { CreatMissionContext } from './context/CreatMissionContext'
import { getUserLocation } from '../../../helpers/getUserLocation'
import { DateMission } from './DateMission'
import { Difficulty } from './Difficulty'
import { LocationMission } from './LocationMission'
import { Rewards } from './Rewards'
import { TitleAndObjective } from './TitleAndObjective'
import { TypeEvidences } from './TypeEvidences'
import { TypeServices } from './TypeServices'


export const CreateMission = () => {

    const [userPosition, setuserPosition] = useState([19.4337585, -99.1454316])
    const [mission, setMission] = useState({});


    useEffect(() => {
        getUserLocation().then((res) => setuserPosition(res))
    }, [])    

    useEffect(() => {
        console.log('mission',mission)
    }, [mission])
    
    return (
        <CreatMissionContext.Provider value={{ mission, setMission }}  >
            <TitleAndObjective />
            <Difficulty />
            <DateMission />
            <Rewards />
            <LocationMission userPosition={userPosition} />
            <TypeServices />
            <TypeEvidences />

        </CreatMissionContext.Provider>
    )
}