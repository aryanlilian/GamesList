// middleware for checking is the current user is logged in
const loginRequired = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/games/list');
}

module.exports = {
    loginRequired,
    isLoggedIn
}
