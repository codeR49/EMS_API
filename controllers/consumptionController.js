const Consumption = require("../models/consumption");

//calculate total generator time run based on location
const locationTotalTime = (location, timeArray) => {
    let outputTime;
    if (location === "Coorg" || location === "Hampi") {
        let time1 = timeArray[0];
        let time2 = timeArray[1];
        let hour = 0;
        let minute = 0;

        let splitTime1 = time1.split(':');
        let splitTime2 = time2.split(':');

        hour = parseInt(splitTime1[0]) + parseInt(splitTime2[0]);
        minute = parseInt(splitTime1[1]) + parseInt(splitTime2[1]);
        hour = parseInt(hour + minute / 60);
        minute = minute % 60;
        outputTime = `${hour}:${minute}`;
    }
    else {
        let time1 = timeArray[0];
        let time2 = timeArray[1];
        let time3 = timeArray[2];
        let hour = 0;
        let minute = 0;

        let splitTime1 = time1.split(':');
        let splitTime2 = time2.split(':');
        let splitTime3 = time3.split(':');

        hour = parseInt(splitTime1[0]) + parseInt(splitTime2[0]) + parseInt(splitTime3[0]);
        minute = parseInt(splitTime1[1]) + parseInt(splitTime2[1]) + parseInt(splitTime3[1]);
        hour = parseInt(hour + minute / 60);
        minute = minute % 60;
        outputTime = `${hour}:${minute}`;
    }

    return outputTime;
    // console.log('sum of above time= ' + hour + ':' + minute);
}

const createConsumption = (req, res, next) => {
    let location = req.body.location;
    let date = req.body.date;
    let keb = req.body.keb;
    let generator = req.body.generator;
    let total = [];
    let generation = 0, timeArray = [], dieselconsumption = 0, outputTime;
    // console.log(generator);
    let kitchenpng = req.body.kitchenpng;
    let waterconsumption = req.body.waterconsumption;
    let weathermin = req.body.weathermin;
    let weathermax = req.body.weathermax;
    let humidity = req.body.humidity;
    let kebrate = req.body.kebrate;
    let fuelrate = req.body.fuelrate;
    let waterrate = req.body.waterrate;
    let pngrate = req.body.pngrate;
    let solargeneration = req.body.solargeneration;
    for (let i = 0; i < generator.length; i++) {

        generation += Number(generator[i].generation);
        dieselconsumption += Number(generator[i].dieselconsumption);
        timeArray.push(generator[i].timerun);
    }
    outputTime = locationTotalTime(location, timeArray);

    total.push({
        "totalGeneration": generation,
        "totalTimeRun": outputTime,
        "dieselConsumption": dieselconsumption
    })
    Consumption.create({ location, date, keb, generator, kitchenpng, total, waterconsumption, weathermin, weathermax, humidity, kebrate, fuelrate, waterrate, pngrate, solargeneration })
        .then((consume) => {
            // console.log('Comsumption created', timeArray);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(consume)
        }, (err) => next(err))
        .catch((err) => next(err))
}

const getConsumptionByLocationDate = (req, res, next) => {
    Consumption.findOne({ date: req.params.date, location: req.params.location })
        .then((consume) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(consume);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getConsumptionBetweenDatesLocation = (req, res, next) => {

    Consumption.find({ location: req.params.location, date: { $gte: req.params.datefrom, $lte: req.params.dateto } })
        .sort({ date: 1 })
        .then((consume) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(consume);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const showAllConsumption = (req, res, next) => {
    Consumption.find({})
        .sort({ date: 1 })
        .then((all) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(all);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    createConsumption,
    getConsumptionByLocationDate,
    showAllConsumption,
    getConsumptionBetweenDatesLocation
}