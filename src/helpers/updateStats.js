import { db } from "../firebase/firebaseConfig"

export const updateStats = async ({ userId, score = 0, status = 'Rejected' }) => {

    const docUserRating = db.collection('users2').doc(userId)

    let stats = await docUserRating.get().then(doc => doc.data().userData.stats)

    let totalPaidMissions = (stats?.totalPaidMissions || 0) + 1
    let totalPoinsMissions = (stats?.totalPoinsMissions || 0) + score
    let totalAccepted = (stats?.totalAccepted || 0)
    let averageAccepted = (stats?.averageAccepted || 0)
    let ranking = (stats?.ranking || 0)

    let totalRejected = (stats?.totalRejected || 0)
    let averageRejected = (stats?.averageRejected || 0)

    if (status === 'Rejected') {
        totalRejected = totalRejected + 1
        averageAccepted = (totalAccepted / totalPaidMissions) * 100
        averageRejected = (totalRejected / totalPaidMissions) * 100
    }

    

    if (status === 'Accepted') {
        totalAccepted = totalAccepted + 1
        averageAccepted = (totalAccepted / totalPaidMissions) * 100
        averageRejected = (totalRejected / totalPaidMissions) * 100
        ranking = (totalPoinsMissions) / (totalAccepted)
    }


    stats = {
        ...stats,
        totalPaidMissions,
        totalPoinsMissions,
        ranking,
        totalRejected,
        averageRejected,
        totalAccepted,
        averageAccepted,

    }

    docUserRating.update({ ['userData.stats']: stats })
}