const express = require('express');
const consumeRouter = express.Router();
const authenticate = require('../middlewares/authenticate');
const consumeController = require("../controllers/consumptionController");
consumeRouter.use(express.json());

/**
 * Routes to view table, only for directors
 */

//To view all consumption data 
consumeRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, consumeController.showAllConsumption);
//To view data filter by date and location
consumeRouter.get('/datelocation/:date/:location', authenticate.verifyUser, authenticate.verifyAdmin, consumeController.getConsumptionByLocationDate);
//To view data filter between dates and location
consumeRouter.get('/daterange/:datefrom/:dateto/:location', authenticate.verifyUser, authenticate.verifyAdmin, consumeController.getConsumptionBetweenDatesLocation);

/**
 * Routes to create table, only for engineer
 */

//To create consumption table
consumeRouter.post('/', authenticate.verifyUser, consumeController.createConsumption);

module.exports = consumeRouter;