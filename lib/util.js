let fetch = require('node-fetch');

/**
 * Get Distance in KM between Latitude / Longitude 2 points
 * @param {int} lat1 The first number.
 * @param {int} lon1 The second number.
 * @param {int} lat2 The second number.
 * @param {int} lon2 The second number.
 * @return {int} Distance in KM between Latitude / Longitude 2 points
 */
function getDistanceBetweenLonLat(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = 0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const getData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

exports.getData = getData;
exports.getDistanceBetweenLonLat = getDistanceBetweenLonLat;
