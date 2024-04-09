const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Import your User model

// Configure Passport.js local strategy for authentication
passport.use(
    
  new LocalStrategy({ usernameField: 'usernameOrEmail' }, // Change the field name

    async (usernameOrEmail, password, done) => {
      
      try {
        // Find user by username or email
        const user = await User.findByUsernameOrEmail(usernameOrEmail);
        if (!user) {
          return done(null, false, { message: 'Incorrect username or email.' });
        }

        const isValidPassword = await User.validatePassword(user, password);
        if (!isValidPassword) {
          console.log('Incorrect password for user:', usernameOrEmail);
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
);

// Serialize and deserialize user for session management
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: 'User not found.' });
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
