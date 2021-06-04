const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Username is incorrect!' });

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);
            if (res === false) return done(null, false, { message: 'Password is incorrect!' });

            return done(null, user);
        });
    });
}));

const passportAuthentication = passport.authenticate('local', {
    successRedirect: '/games/list',
    failureRedirect: '/auth/login?error=true'
});

module.exports = passportAuthentication;
