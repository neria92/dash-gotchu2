

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.latitude, coords.longitude])
            },
            (err) => {
                console.log('no se pudo enconrear ubicación ', err)
                reject()
            }
        )
    })
}
