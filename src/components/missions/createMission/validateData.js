


export const validateData = (data) => {
    const missionName = data?.missionData?.missionName
    const missionObjetive = data?.missionData?.missionObjetive
    const difficulty = data?.missionData?.difficulty
    const typeEvidence = data?.missionData?.typeEvidence || {}
    const images = data?.missionData?.media?.images
    const startDate = data?.missionData?.startDate
    const finishDate = data?.missionData?.finishDate
    const money = data?.missionData?.loot?.money
    const gCoins = data?.missionData?.loot?.gCoins
    const xp = data?.missionData?.loot?.xp

  


    if (!missionName) {
        return [true, `Es necesario que la misión tenga titulo`]
    }

    if (!missionObjetive) {

        return [true, `Es necesario que la misión tenga objetivo`]
    }
    if (!images) {

        return [true, `Es necesario que la misión tenga por lo menos una imagen`]
    }
    if (!difficulty) {

        return [true, `Es necesario que la misión nivel de dificultad`]
    }
    if (!startDate) {

        return [true, `Es necesario tenga una fecha de inicio`]
    }
    if (!finishDate) {

        return [true, `Es necesario tenga una fecha de termino`]
    }
    if (startDate.getTime() > finishDate.getTime()) {

        return [true, `Es necesario que la fecha de inicio sea menor a la de termino`]
    }
    if (!money) {

        return [true, `Es necesario que la misión tenga recompensa de dinero por lo menos 0`]
    }
    if (!gCoins) {

        return [true, `Es necesario que la misión tenga recompensa de gCoins `]
    }
    if (!xp) {

        return [true, `Es necesario que la misión tenga recompensa de xp `]
    }
    if (Object.keys(typeEvidence).length === 0) {
        return [true, `Es necesario que la misión tenga  que tipo de evidencia se requiere`]
    }
    if (typeEvidence?.photos === 0 || isNaN(typeEvidence?.photos)) {

        return [true, `Es necesario que la misión tenga  un minimo de fotos`]

    }
    if (typeEvidence?.videos === 0 || isNaN(typeEvidence?.videos)) {

        return [true, `Es necesario que la misión tenga  un minimo de segundos para el video`]
    }

    return [false, '']

}
