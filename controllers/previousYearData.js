let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

const getAllCoorg = async (req, res, next) => {

    await MongoClient.connect(process.env.MONGO_URL, function (err, db) {
        if (err) { return console.dir(err); }
        let database = db.db('electricDB');
        let collection = database.collection('coorg_py');
        collection.find({}).toArray(function (err, coorg) {
            // here ...
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(coorg);
        });
    });
    
}

const getAllHampi = async (req, res, next) => {

    await MongoClient.connect(process.env.MONGO_URL, function (err, db) {
        if (err) { return console.dir(err); }
        let database = db.db('electricDB');
        let collection = database.collection('hampi_py');
        collection.find({}).toArray(function (err, hampi) {
            // here ...
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(hampi);
        });
    });
    
}

const getAllKabini = async (req, res, next) => {

    await MongoClient.connect(process.env.MONGO_URL, function (err, db) {
        if (err) { return console.dir(err); }
        let database = db.db('electricDB');
        let collection = database.collection('kabini_py');
        collection.find({}).toArray(function (err, kabini) {
            // here ...
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(kabini);
        });
    });
    
}

module.exports = {
    getAllCoorg,
    getAllHampi,
    getAllKabini
}