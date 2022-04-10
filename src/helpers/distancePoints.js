const toRadians = (degree) => {
    // cmath library in C++  
    // defines the constant 
    // M_PI as the value of 
    // pi accurate to 1e-30 
    let one_deg = (3.1415) / 180.0;
    return (one_deg * degree);
}

export const distanceEarth = (lat1, long1, lat2, long2) => {
    // Convert the latitudes  
    // and longitudes 
    // from degree to radians. 
    lat1 = toRadians(lat1);
    long1 = toRadians(long1);
    lat2 = toRadians(lat2);
    long2 = toRadians(long2);

    // Haversine Formula 
    let dlong = long2 - long1;
    let dlat = lat2 - lat1;

    let ans = Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(dlong / 2), 2);

    ans = 2 * Math.asin(Math.sqrt(ans));

    // Radius of Earth in  
    // Kilometers, R = 6371 
    // Use R = 3956 for miles 
    let R = 6371;

    // Calculate the result 
    ans = ans * R;

    return ans;
}