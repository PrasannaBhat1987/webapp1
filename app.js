const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

var app = express();
const port = process.env.PORT || 4000;

//Define paths for express config
const publicDirPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/public/templates/views');
const partialspath = path.join(__dirname, '/public/templates/partials')

//Setup handlebars and required view locations
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

// console.log(__dirname);
// console.log(path.join(__dirname, '/public'));
//app.use(express.static(path.join(__dirname, '/public')));

app.get('', (req, res) => {
    res.send('Home page');
});

// app.get('/about', (req, res) => {
//     res.send('About page');
// });

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'Please provide address !!'
        });
    }

    geocode(req.query.address, (err, {latitude, longitude, location}) => {
        if (!req.query.address) {
            return console.log('Please provide the address.');
        }
        if (err) {
            console.log(err);
        } else {
            console.log('Data = ' + latitude, longitude, location);
            forecast({latitude, longitude, location}, (error, forecastdata) => {
                console.log('Error', error);
                console.log('Data', location);
                console.log('Temperature = ' + forecastdata.currently.temperature);
                res.send({
                    'forecast' : forecastdata.daily.summary,
                    location
                });
            })
        }
        
    })

    
});

app.get('/html', (req, res) => {
    res.send('<h1>HTML h1 page</h1>');
});

app.get('/json', (req, res) => {
    res.send({
        'name': 'Prasanna',
        'gender' : 'Male'
    });
});

app.get('/index', (req, res) => {
    res.render('index', {
        'title' : 'Dynamic Index Title from Node',
        'name' : 'Dynamic Index name from node'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        'title' : 'Dynamic about Title from Node',
        'name' : 'Dynamic about name from node'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        'title' : 'Dynamic help Title from Node',
        'name' : 'Dynamic help name from node'
    });
});
app.get('/help/*', (req, res) => {
    //res.send('My 404 error page');
    res.render('404', {
        'title': '404 error text',
        'name': 'Pras',
        'errorMessage': 'This help content not found !!'
    });
});
app.get('*', (req, res) => {
    //res.send('My 404 error page');
    res.render('404', {
        title: '404 error text',
        name: 'Pras',
        errorMessage: 'This page not found !!'
    });
});
app.listen(port, () => {
    console.log('Server is started at port ' + port);
});