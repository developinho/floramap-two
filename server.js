var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http'), 
    plant = require('./routes/plants'),
    app = express();



process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
    app.set('port', process.env.PORT || 3000);
    
    
   // app.use(logger); 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

};

app.get('/plants', plant.findAll);
app.get('/plants/:id', plant.findById);
app.post('/plants', plant.addPlant);
app.put('/plants/:id', plant.updatePlant);
app.delete('/plants/:id', plant.deletePlant);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
})

var mongodb = require('mongodb');

var mongoose = require('mongoose');
mongoose.connect('mongodb://edgewater:floramap@ds047050.mongolab.com:47050/users');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var kittySchema = mongoose.Schema({
    name: String
})

var Kitten = mongoose.model('Kitten', kittySchema)

var silence = new Kitten({ name: 'Silence' })
console.log(silence.name)

