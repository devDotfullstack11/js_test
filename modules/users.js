//const connection = require("../connection");
const bcrypt = require("bcrypt");
const util = require('util');
const { body, validationResult } = require("express-validator");
var express = require("express"),
  router = express.Router();
  const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const settings = require("../settings");

router.get("/login", function (req, res) {
    res.render("users/login", {
      title: "User Login",
      data: {},
      email: "",
      messages: {},
      error: "",
      success:''
    });
});

router.get("/register", function (req, res) {
    res.render("users/register", {
      title: "User Register",
      data: {},
      email: "",
      messages: {},
      error: "",
      success:''
    });
});


/* 
  @Action Name: /register
  @purpose: Register User
  */
  
    
  router.post(
    '/register',
    async (req, res, next) => {
      passport.authenticate(
        'signup',
        async (err, user, info) => {
          try {
            console.log("err =>",err);
            if (err) {
              
              return res.json({
                  status: 'error',
                  message: err
                });
            }
            return res.json({
              status: 'success',
              message: 'Signup successful',
              user: user
            });
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    },
    async (req, res, next) => {
      
      
    }
  );

/* 
  @Action Name: /register
  @purpose: Register User
  */

  // ...



router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.json({
              status: 'error',
              message: err
            });
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user.id, email: user.email };
              const token = jwt.sign({ user: body }, settings.jwt_secert );

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;
