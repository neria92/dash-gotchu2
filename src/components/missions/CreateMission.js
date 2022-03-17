import React from 'react'
import { DateMission } from './createMission/DateMission'
import { Difficulty } from './createMission/Difficulty'
import { Rewards } from './createMission/Rewards'
import { TitleAndObjective } from './createMission/TitleAndObjective'

export const CreateMission = () => {
    return (
        <div >
            <TitleAndObjective />

            <Difficulty />

            <DateMission />

            <Rewards />


        </div>
    )
}
