import React from 'react'
import { db } from '../firebase/firebaseConfig'

export const updateAppeal = async ({ missionId, userId, captureId, status, appealId }) => {

    const mission = await db.collection('missions2').doc(missionId).get().then(res => {
        return { ...res.data(), id: res.id }
    })

    let evidences = mission.evidences[userId]

    evidences = {
        ...evidences,
        status
    }

    const evidenceRoute = `evidences.${userId}`

    db.collection('missions2').doc(missionId).update({
        [evidenceRoute]: evidences
    })

    db.collection('captures2').doc(captureId).update({
        status,
        appeal: { status: 'finish' },
    })
    
    db.collection('appeal').doc(appealId).update({
        status: 'finish',
        decision:status
    })

}
