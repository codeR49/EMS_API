const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const authenticate = require('../middlewares/authenticate');
const userController = require("../controllers/userController");
userRouter.use(express.json());

/* GET users listing. */
userRouter.get('/', authenticate.verifyUser, authenticate.verifyDirector, userController.getAllUsers);
/* Register user */
userRouter.post('/signup', userController.registerUser);
/* Login user */
userRouter.post('/login', passport.authenticate('local'), userController.loginUser);

/* Edit user details*/
userRouter.put('/edit/:userId', authenticate.verifyUser, userController.editUser);

/* Edit password */
userRouter.put('/editpassword/:userId', authenticate.verifyUser, userController.editPassword);

module.exports = userRouter;