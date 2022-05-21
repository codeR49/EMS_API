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

    const dateNow = new Date();
    const hours = dateNow.getHours();
    const minutes = dateNow.getMinutes();
    const seconds = dateNow.getSeconds();
    const hms = `${hours}:${minutes}:${seconds}`

    const location = req.body.location;
    const date = req.body.date;
    const timeofrecording = hms;
    const keb = req.body.keb;
    const generator = req.body.generator;
    let total = [];
    let generation = 0, timeArray = [], dieselconsumption = 0, outputTime;
    // console.log(generator);
    const kitchenpng = req.body.kitchenpng;
    const waterconsumption = req.body.waterconsumption;
    const weathermin = req.body.weathermin;
    const weathermax = req.body.weathermax;
    const humidity = req.body.humidity;
    const kebrate = req.body.kebrate;
    const fuelrate = req.body.fuelrate;
    const waterrate = req.body.waterrate;
    const pngrate = req.body.pngrate;
    const solargeneration = req.body.solargeneration;
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
    Consumption.create({ location, date, timeofrecording, keb, generator, kitchenpng, total, waterconsumption, weathermin, weathermax, humidity, kebrate, fuelrate, waterrate, pngrate, solargeneration })
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

const approveDisapproveConsumption = (req, res, next) => {

    Consumption.findByIdAndUpdate(req.params.id, 
        { $set: { status: req.body.status, remark: req.body.remark }, new: true})
        .then((status) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(status);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const showapproveConsumption = (req, res, next) => {

    Consumption.find({status: true})
        .sort({ date: 1 })
        .then((status) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(status);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports = {
    createConsumption,
    getConsumptionByLocationDate,
    showAllConsumption,
    getConsumptionBetweenDatesLocation,
    approveDisapproveConsumption,
    showapproveConsumption
}