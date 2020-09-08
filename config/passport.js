//Make sure the models are loaded
let UserModel = require('../app/models/user.server.model'),
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('mongoose').model('User'),
    passport = require('passport');
    
const DEVELOPMENT = process.env.NODE_ENV == 'development' || typeof process.env.NODE_ENV == "undefined";
const BASE_URL = process.env[(DEVELOPMENT ? "DEVELOPMENT" : "PRODUCTION") + "_URL"];
    
const keys = {
    "google": {
        "clientID": process.env.GOOGLE_ID,
        "clientSecret": process.env.GOOGLE_SECRET,
        "callbackURL": BASE_URL + "/auth/google/callback"
    },
    "github": {
        "clientID": process.env.GITHUB_ID,
        "clientSecret": process.env.GITHUB_SECRET,
        // "callbackURL": BASE_URL + "/auth/github/callback"
    },
    "twitter": {
        "consumerKey": process.env.TWITTER_ID,
        "consumerSecret": process.env.TWITTER_SECRET,
        "callbackURL": BASE_URL + "/auth/twitter/callback"
    },
    "facebook": {
        "clientID": process.env.FACEBOOK_ID,
        "clientSecret": process.env.FACEBOOK_SECRET,
        "callbackURL": BASE_URL + "/auth/facebook/callback"
    },
};
   
module.exports = function() {
  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    passport.use(new GitHubStrategy(keys.github,
      findOrCreateUser("github")
    ));
  }
  
  if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
    passport.use(new GoogleStrategy(keys.google,
      findOrCreateUser("google")
    ));
  }

  if (process.env.TWITTER_ID && process.env.TWITTER_SECRET) {
    passport.use(new TwitterStrategy(keys.twitter,
      findOrCreateUser("twitter")
    ));
  }

  if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
    passport.use(new FacebookStrategy(keys.facebook,
      findOrCreateUser("facebook")
    ));
  }
  
  passport.serializeUser(function(user, done) {
  	// console.log("Serializing user " + JSON.stringify(user));
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
      // console.log("Deserializing user " + JSON.stringify(user));
      done(error, user);
    });
  });
  return passport;
}

function findOrCreateUser(provider) {
  return function(accessToken, refreshToken, profile, done) {
    User.findOneAndUpdate({ 
        "id": profile.id, 
        "provider": provider
      }, profile, { upsert: true },
      function (error, user) {
        // console.log("findOrCreateUser ", error ? error : user);
        return done(error, user);
      }
    );
  }
}