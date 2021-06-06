const Game = require('../models/game');
const User = require('../models/user');
const gameCategories = require('../constants/games');


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
            let userCanDeleteOrUpdate = false;
            if (gameUserId.equals(currentUserId)) userCanDeleteOrUpdate = true;
            const context = {
                title: 'Game Details',
                game: result,
                isLoggedIn: req.isAuthenticated(),
                userCanDeleteOrUpdate: userCanDeleteOrUpdate
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

const getUpdateGame = (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then(result => {
            const context = {
                title: 'Update',
                game: result,
                gameCategories: gameCategories,
                isLoggedIn: req.isAuthenticated()
            }
            res.render('games/update-game', context);
        })
        .catch(err => console.log(err));
}

const postUpdateGame = (req, res) => {
    const id = req.params.id;
    Game.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    }).then(result => res.redirect('/games/user/list'))
    .catch(err => console.log(err));
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
    getUpdateGame,
    postUpdateGame,
    getDeleteGame,
    postDeleteGame
}
