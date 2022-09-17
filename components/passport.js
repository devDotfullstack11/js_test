//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const UserModel = db.users;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const settings = require("../settings");
const bcrypt = require("bcrypt");


// ...

passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
            const hash = bcrypt.hashSync(password, 10);
          const user = await UserModel.create({ email, hash });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

// ...

passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ where: {email : email } });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          let validate = await bcrypt.compare(password, user.password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );




passport.use(
  new JWTStrategy(
    {
      secretOrKey: settings.jwt_secert,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);