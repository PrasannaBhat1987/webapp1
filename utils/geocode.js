const request = require('request');

const geocode = (address, callback) => {
    var geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJhc2FubmFiaGF0IiwiYSI6ImNrMHl1OWdhdTBodW0zbG81N3kyb2x6ZWIifQ.NQvSWgxbJbGHa0FjZanYzQ';
    request({url:geourl, json:true}, (err, data) => {
        if (err) {
            callback('Unable to get the data for provided location' + err);
        } else {
            //console.log(data);
            //console.log('Bangalore, latitude = ' + data.body.features[0].center[0] + ', longitude = ' + data.body.features[0].center[1]);
            //callback(null, address + ', latitude = ' + data.body.features[0].center[0] + ', longitude = ' + data.body.features[0].center[1]);
            callback(undefined, {
                latitude: data.body.features[0].center[1],
                longitude : data.body.features[0].center[0],
                location:  data.body.features[0].place_name
            });
        }
        
    });
}

module.exports = geocode;