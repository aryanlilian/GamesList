const Game = require('../models/game');
const User = require('../models/user');


const getGamesList = (req, res) => {
    Game.find().sort({ createdAt: -1 })
        .then((result) => {
            const context = {
                title: 'Games List',
                games: result,
                isLoggedIn: req.isAuthenticated()
            }
            res.render('games/games-list', context);
        })
        .catch(err => console.log(err));
}

const getUserGamesList = (req, res) => {
    const user = User.findById(req.user._id)
        .populate('games')
        .then(result => {
            const context = {
                title: 'My Games',
                isLoggedIn: req.isAuthenticated(),
                games: result.games
            }
            res.render('games/games-user-list', context);
        }).catch(err => console.log(err));
}

const getAddGame = (req, res) => {
    const context = {
        title: 'Add Game',
        isLoggedIn: req.isAuthenticated()
    }
    res.render('games/add-game', context);
}

const postAddGame = (req, res) => {
    const user = req.user;
    const game = new Game(req.body);
    game.user = user;
    game.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    user.games.push(game);
    user.save()
        .then(result => res.redirect('/games/user/list'))
        .catch(err => console.log(err));
}

const getGameDetails = (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then((result) => {
            const [gameUserId, currentUserId] = [result.user, req.user._id];
            let userCanDelete = false;
            if (gameUserId.equals(currentUserId)) userCanDelete = true;
            const context = {
                title: 'Game Details',
                game: result,
                isLoggedIn: req.isAuthenticated(),
                userCanDelete: userCanDelete
            }
            res.render('games/game-details', context);
        })
        .catch((err) => {
            const context = {
                title: '404'
            }
            res.status(404).render('404', context);
        });
}

const getDeleteGame = (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then((result) => {
            const context = {
                title: 'Delete Game',
                game: result,
                isLoggedIn: req.isAuthenticated()
            }
            res.render('games/delete-game', context);
        })
        .catch((err) => {
            const context = {
                title: '404'
            }
            res.status(404).render('404', context);
        });
}

const postDeleteGame = (req, res) => {
    const id = req.params.id;
    Game.findByIdAndRemove(id)
        .then(result => res.redirect('/games/list'))
        .catch(err => console.log(err));
}

module.exports = {
    getGamesList,
    getUserGamesList,
    getAddGame,
    postAddGame,
    getGameDetails,
    getDeleteGame,
    postDeleteGame
}
