import React, { useEffect, useReducer, useState } from 'react'
import { getUserLocation } from '../../helpers/getUserLocation'
import { DateMission } from './components/DateMission'
import { Difficulty } from './components/Difficulty'
import { Map } from './components/Map'
import { Rewards } from './components/Rewards'
import { TitleAndObjective } from './components/TitleAndObjective'
import { TypeEvidences } from './components/TypeEvidences'


export const CreateMission = () => {

    const [userPosition, setuserPosition] = useState([19.4337585, -99.1454316])
    const [missionData, setMissionData] = useState({})


    useEffect(() => {
        getUserLocation().then((res) => setuserPosition(res))
    }, [])

    return (
        <div >
            <TitleAndObjective
                missionData={missionData}
                setMissionData={setMissionData}
            />

            <Difficulty
                missionData={missionData}
                setMissionData={setMissionData}
            />

            <DateMission
                missionData={missionData}
                setMissionData={setMissionData}
            />

            <Rewards
                missionData={missionData}
                setMissionData={setMissionData}
            />

            <Map
                missionData={missionData}
                setMissionData={setMissionData}
                userPosition={userPosition}
            />

            <TypeEvidences
                missionData={missionData}
                setMissionData={setMissionData}
            />


        </div>
    )
}
