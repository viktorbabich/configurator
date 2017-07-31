module.exports = {
    addExpressMiddleware,
    CORSMiddleware
};

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');
const config = require('./config');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('./models/User.js').User;

fs.access(config.multer.dest, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) fs.mkdir(path.join(__dirname, config.multer.dest), err => console.log(err ? err : `direct create ${path.join(__dirname, config.multer.dest)}`));
});

const upload = multer({ dest: path.join(__dirname, config.multer.dest) });


const mConnection = mongoose.connect(config.mongoUrl, {
  safe: false
});


const MongoStore = require('connect-mongo')(session);

config.session.store = new MongoStore({ mongooseConnection: mongoose.connection });

// passport.use('admins-local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// },
//     User.authorize.bind(User))
// );

passport.use(new GoogleStrategy({
    clientID: config.oAuth.id,
    clientSecret: config.oAuth.secret,
    callbackURL: `http://localhost:${config.port}${config.oAuth.returnURL}`
  },
  function(token, tokenSecret, profile, done) {
        console.log(profile, profile.emails);
        //return done(null, null);
      User.findOrCreate({ googleID: profile.id, email: profile.emails[0].value }, function (err, user) {
        return done(err, user);
      })
  }
));


passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



function CORSMiddleware(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Methods", "DELETE GET HEAD POST PUT OPTIONS TRACE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
}

function addExpressMiddleware(app) {
    app.use(session(config.session));
    app.use(helmet());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(upload.single('file'));
}

