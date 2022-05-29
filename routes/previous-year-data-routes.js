const express = require('express');
const previousYearRouter = express.Router();
const authenticate = require('../middlewares/authenticate');
const previousYearController = require("../controllers/previousYearData");
previousYearRouter.use(express.json());

/**
 * Routes to view table, only for directors
 */

//To view coorg previous year data 
previousYearRouter.get('/coorg', authenticate.verifyUser, authenticate.verifyDirector, previousYearController.getAllCoorg);
//To view hampi previous year data 
previousYearRouter.get('/hampi', authenticate.verifyUser, authenticate.verifyDirector, previousYearController.getAllHampi);
//To view kabini previous year data 
previousYearRouter.get('/kabini', authenticate.verifyUser, authenticate.verifyDirector, previousYearController.getAllKabini);

module.exports = previousYearRouter;