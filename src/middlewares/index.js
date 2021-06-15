const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const AuthModel = require("../models/auth.model");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//handle sign up 
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "AID",
      passwordField: "Apassword",
    },
    async (AID, Apassword, done) => {
      try {
        const user = await AuthModel.create({ AID, Apassword });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//handle login
passport.use(
  "login",
  new localStrategy(
    {
        usernameField: "AID",
        passwordField: "Apassword",
    },
    async (AID, Apassword, done) => {
      try {
        const user = await AuthModel.findOne({ AID });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(Apassword);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
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
  
