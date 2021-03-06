require('dotenv').config()
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = process.env.SECRET_KEY;

// passport.use(new localStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config,
        { expiresIn: '2h' });
};

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyDirector = function (req, res, next) {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            console.log("User: ", req.user);
            if (user.roles === "Director") {
                next();
            }
            else {
                err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
}

exports.verifyGM = function (req, res, next) {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            console.log("User: ", req.user);
            if (user.roles === "General Manager") {
                next();
            }
            else {
                err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
}
