const Game = require('../models/game');

const userCanAccess = (req, res, next) => {
    const objId = req.params.id;
    Game.findById(objId)
        .then((result) => {
            const [gameUserId, userId]= [result.user, req.user._id];
            if (gameUserId.equals(userId)) {
                console.log("I am here");
                next();
            } else {
                res.status(403).render('errors-pages', {
                    title: '403',
                    content: 'Forbidden! You are not allowed to access this page!',
                    isLoggedIn: req.isAuthenticated()
                });
            }
        })
        .catch(err => res.status(400).render('errors-pages', {
            title: '400',
            content: 'Bad Request! Something went wrong!',
            isLoggedIn: req.isAuthenticated()
        }))
}

module.exports = userCanAccess;
