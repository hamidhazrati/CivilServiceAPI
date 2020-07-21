/* eslint-disable new-cap */

const router = require('express').Router();
const conf = require('../../assets/config.json');
const util = require('../../lib/util');

const filterByDistance = (res, distance, cityLongLat) => {
    return res.filter((o)=>{
                    return util.getDistanceBetweenLonLat(
                        o.latitude,
                        o.longitude,
                        cityLongLat[0],
                        cityLongLat[1] ) < distance;
            });
};

const handleResponse = (city, distance, resp) => {
    let matchingUsers = [];
    let cityUsers = [];

    util.getData(conf.allUsersUrl).then( (res) => {
        matchingUsers = filterByDistance(res, distance, conf.cityLongLat);
    }).then( async () => {
        return util.getData(conf.londonUsersUrl)
                .then((res)=> cityUsers = res);
    }).then(()=>{
        const withinDistanceIdArray = [];
        const cityUsersIdArray = [];

        matchingUsers.forEach((o)=>{
            withinDistanceIdArray.push(o.id);
        });
        cityUsers.forEach((o) => {
            cityUsersIdArray.push(o.id);
        });

        cityUsers.forEach((o) => {
            if (!withinDistanceIdArray.includes(o.id)) {
                matchingUsers.push(o);
            }
        });

        resp.status(201)
            .json({
                city: city,
                distance: distance,
                withinDistanceIdArray: withinDistanceIdArray,
                cityUsersIdArray: cityUsersIdArray,
                matchingUsers: matchingUsers,
        });
    });
};
router.get('/:city/:distance', (req, resp) => {
    const city = req.params.city;
    const distance = req.params.distance;
    handleResponse(city, distance, resp);
});

exports.filterByDistance = filterByDistance;
exports.handleResponse = handleResponse;
