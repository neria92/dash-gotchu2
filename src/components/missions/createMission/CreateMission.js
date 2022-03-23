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
    const [missionData, setMissionData] = useState({});
    const [onReset, setOnReset] = useState(false);


    useEffect(() => {
        getUserLocation().then((res) => setuserPosition(res))
    }, [])

    return (
        <div >
            <TitleAndObjective
                missionData={missionData}
                setMissionData={setMissionData}
                onReset={onReset}
            />

            <Difficulty
                missionData={missionData}
                setMissionData={setMissionData}
                onReset={onReset}
            />

            <DateMission
                missionData={missionData}
                setMissionData={setMissionData}
                onReset={onReset}
            />

            <Rewards
                missionData={missionData}
                setMissionData={setMissionData}
                onReset={onReset}
            />

            <Map
                missionData={missionData}
                setMissionData={setMissionData}
                userPosition={userPosition}
                onReset={onReset}
            />

            <TypeEvidences
                missionData={missionData}
                setMissionData={setMissionData}
                onReset={onReset}
                setOnReset={setOnReset}
            />


        </div>
    )
}
