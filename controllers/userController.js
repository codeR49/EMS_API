const Users = require("../models/users");
const passport = require("passport");
const authenticate = require("../middlewares/authenticate");

const getAllUsers = (req, res, next) => {
  Users.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

const registerUser = (req, res) => {
  Users.register(
    new Users({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      roles: req.body.roles,
      location: req.body.location,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
};

const loginUser = (req, res) => {
  var token = authenticate.getToken({
    _id: req.user._id,
    name: req.user.name,
    roles: req.user.roles,
    location: req.user.location,
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
  });
};

const editUser = (req, res, next) => {
  Users.findByIdAndUpdate(
    req.params.userId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

const editPassword = (req, res, next) => {
  Users.findOne({_id: req.params.userId}).then((user) => {
    user.changePassword(
      req.body.password,
      req.body.newpassword,
      function (err, newpass) {
        if (err) {
          res.json({
            success: false,
            message: "Password could not be saved. Please try again!",
          });
        } else {
          res.json({
            success: true,
            message: "Your new password has been saved successfully",
            newpass
          });
        }
      }
    );
  });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  editUser,
  editPassword,
};
