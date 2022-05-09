const express = require('express');
const consumeRouter = express.Router();
const authenticate = require('../middlewares/authenticate');
const consumeController = require("../controllers/consumptionController");
consumeRouter.use(express.json());

consumeRouter.get('/', authenticate.verifyUser, consumeController.showAllConsumption);
consumeRouter.get('/datelocation/:date/:location', authenticate.verifyUser, consumeController.getConsumptionByLocationDate);
consumeRouter.post('/', authenticate.verifyUser, consumeController.createConsumption);

module.exports = consumeRouter;