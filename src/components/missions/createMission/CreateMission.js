import React, { useEffect, useReducer, useState } from 'react'
import { getUserLocation } from '../../../helpers/getUserLocation'
import { DateMission } from './DateMission'
import { Difficulty } from './Difficulty'
import { Map } from './Map'
import { Rewards } from './Rewards'
import { TitleAndObjective } from './TitleAndObjective'
import { TypeEvidences } from './TypeEvidences'


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
