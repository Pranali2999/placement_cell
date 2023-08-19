const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

const local = new LocalStrategy({ usernameField: 'email', passReqToCallback:true }, async function (
  req,
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordCorrect(password))) {
      req.flash('error','Invalid Username/Password');
      //console.log('Invalid Username/Password');
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    req.flash('error',error);
    // console.log(`Error in finding user: ${error}`);
    return done(error);
  }
});

passport.use('local', local);

// serialize user
passport.serializeUser(async function (user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);

    if (!user) {
      console.log('User not found --> Passport');
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> Passport');
    return done(err);
  }
});

// check if user is authenticated
passport.checkAuthentication = async function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser =async function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
