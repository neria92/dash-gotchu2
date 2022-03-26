import React, { useEffect, useReducer, useState } from 'react'
import { CreatMissionContext } from './context/CreatMissionContext'
import { getUserLocation } from '../../../helpers/getUserLocation'
import { DateMission } from './DateMission'
import { Difficulty } from './Difficulty'
import { Map } from './Map'
import { Rewards } from './Rewards'
import { TitleAndObjective } from './TitleAndObjective'
import { TypeEvidences } from './TypeEvidences'


export const CreateMission = () => {

    const [userPosition, setuserPosition] = useState([19.4337585, -99.1454316])
    const [mission, setMission] = useState({});
    const [onReset, setOnReset] = useState(false);


    useEffect(() => {
        getUserLocation().then((res) => setuserPosition(res))
    }, [])

    useEffect(() => {
     console.log('mission',mission)
    }, [mission])
    

    return (
        <CreatMissionContext.Provider value={{  mission, setMission, onReset }}  >
            <TitleAndObjective/>

            <Difficulty
                missionData={mission}
                setMissionData={setMission}
                onReset={onReset}
            />

            <DateMission
                missionData={mission}
                setMissionData={setMission}
                onReset={onReset}
            />

            <Rewards
                missionData={mission}
                setMissionData={setMission}
                onReset={onReset}
            />

            <Map
                missionData={mission}
                setMissionData={setMission}
                userPosition={userPosition}
                onReset={onReset}
            />

            <TypeEvidences
                missionData={mission}
                setMissionData={setMission}
                onReset={onReset}
                setOnReset={setOnReset}
            />


        </CreatMissionContext.Provider>
    )
}
