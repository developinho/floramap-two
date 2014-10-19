exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving plant: ' + id);
    db.collection('plants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('plants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addPlant = function(req, res) {
    var plant = req.body;
    console.log('Adding plant: ' + JSON.stringify(plant));
    db.collection('plants', function(err, collection) {
        collection.insert(plant, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatePlant = function(req, res) {
    var id = req.params.id;
    var plant = req.body;
    delete plant._id;
    console.log('Updating plant: ' + id);
    console.log(JSON.stringify(plant));
    db.collection('plants', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, plant, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating plant: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(plant);
            }
        });
    });
}

exports.deletePlant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting plant: ' + id);
    db.collection('plants', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var plants = [
    {
        name: "Red Rose",
        notes: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
        picture: "saint_cosme.jpg"
    },
    {
        name: "White Rose",
        notes: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.",
        picture: "lan_rioja.jpg"
    }];

    db.collection('plants', function(err, collection) {
        collection.insert(plants, {safe:true}, function(err, result) {});
    });

};
