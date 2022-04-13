import React from 'react'
import { db } from '../../../firebase/firebaseConfig'

export const updateStatus = async ({ captureId, status, userId, mission }) => {
    db.collection('captures2').doc(captureId).update({
        status
    })
    const user = await db.collection('users2').doc(userId).get()
        .then((doc) => {
            if (doc.exists) { return ({ ...doc.data(), id: doc.id }) }
        })
    let newDoc = {}
    console.log('mission?.missionData?.loot?.money',mission?.missionData?.loot?.gCoins)
    if (status === 'Accepted') {
        const money = (user?.userData?.stats?.money || 0) + (mission?.missionData?.loot?.money || 0)
        const xp = (user?.userData?.stats?.xp || 0) + (mission?.missionData?.loot?.xp || 0)
        const gCoins = (user?.userData?.stats?.gCoins || 0) + (mission?.missionData?.loot?.gCoins || 0)
        console.log('gCoins',(user?.userData?.stats?.gCoins || 0) ,(mission?.missionData?.loot?.gCoins || 0))
        newDoc = { ...user, userData: { ...user.userData, stats: { ...user.userData.stats, money, xp, gCoins } } }
    } else {
        const money = (user?.userData?.stats?.money || 0) - (mission?.missionData?.loot?.money || 0)
        const xp = (user?.userData?.stats?.xp || 0) - (mission?.missionData?.loot?.xp || 0)
        const gCoins = (user?.userData?.stats?.gCoins || 0) - (mission?.missionData?.loot?.gCoins || 0)
        console.log('gCoins',(user?.userData?.stats?.gCoins || 0) ,(mission?.missionData?.loot?.gCoins || 0))
        
        newDoc = { ...user, userData: { ...user.userData, stats: { ...user.userData.stats, money, xp, gCoins } } }
    }
    
    db.collection('users2').doc(userId).update(newDoc)

}
