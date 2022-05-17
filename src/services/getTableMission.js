export const getTableMissions = async ({ table,latitude, longitude }) => {

    const direction = fetch("https://us-central1-gchgame.cloudfunctions.net/get_nearest_locations", {
        method: 'POST',
        headers: {
            
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            table,
            latitude,
            longitude
        }),
    })
        .then(res => res.json())
        .then(res => res);

    return direction;
}