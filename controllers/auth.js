const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation }  = require('../validations/user-validation');

const getUserRegister = (req, res) => {
    // The context obj for the template
    const context = {
        title: 'Register',
        errorMessage: null,
        isLoggedIn: req.isAuthenticated()
    }
    res.render('auth/register', context);
}

const postUserRegister = async (req, res) => {
    // The context obj for the template
    const context = {
        title: 'Register',
        errorMessage: null,
        isLoggedIn: req.isAuthenticated()
    }

    // Register form validation
    const { error } = registerValidation(req.body);
    if (error) {
        context.errorMessage = error.details[0].message;
        res.status(400).render('auth/register', context);
    }

    // Checking if the username already exists in the DB
    const username = req.body.username;
    const usernameExist = await User.findOne({username: username});
    if (usernameExist) {
        context.errorMessage = 'Username already exists!';
        res.status(400).render('auth/register', context);
    }

    // Checking if the email already exists in the DB
    const email = req.body.email;
    const emailExist = await User.findOne({email: email});
    if (emailExist) {
        context.errorMessage = 'Email already exists!';
        res.status(400).render('auth/register', context);
    }

    // Checking if passwords match
    const [password1, password2] = [req.body.password1, req.body.password2];
    if (password1 !== password2) {
        context.errorMessage = 'Passwords didn\'t match!';
        res.status(400).render('auth/register', context);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // Register the user to the DB
    const userObj = {
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword
    }
    const user = new User(userObj);
    user.save()
        .then(result => res.render('auth/login', context))
        .catch(err => console.log(err));
}

const getUserLogin = (req, res) => {
    // The context obj for the template
    const context = {
        title: 'Login',
        error: req.query.error,
        isLoggedIn: req.isAuthenticated()
    }
    res.render('auth/login', context);
}

const getUserLogout = (req, res) => {
    req.logout();
    res.redirect('/auth/login');
}

module.exports = {
    getUserRegister,
    postUserRegister,
    getUserLogin,
    getUserLogout
}
