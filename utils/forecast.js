const request = require('request');

const forecast = (payload, callback) => {
    var url = 'https://api.darksky.net/forecast/4303189109b9f934f1a6bc3c6298c286/' + payload.latitude + ',' + payload.longitude + '?units=si';
    request({url:url, json:true}, (err, res) => {
        if (err) {
            callback('Unable to get the forecast ' + err);
        } else {
            callback(undefined, res.body);
        }
        
        //console.log(res.body.daily.data[0].summary +', Current Temperature = ' + res.body.currently.temperature + ', precepitation = ' + res.body.currently.precipProbability);
    });
}

module.exports = forecast;