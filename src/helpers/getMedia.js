export const getMedia = (media) => {
    const images = media?.photos || media?.images || [];
    const photos = images.map(item => {
        return ({
            uri: item.url,
            photo: true,
            date: item.date
        })
    })

    const mediaVideos = media?.videos || [];
    const videos = mediaVideos.map(item =>
    ({
        uri: item.url,
        video: true,
        date: item.date,
    })
    )
    let medias = [...photos, ...videos]
    medias.sort((a, b) => {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        return 0;
    });
    return medias
}