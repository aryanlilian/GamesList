const Game = require('../models/game');

const getGamesList = (req, res) => {
    Game.find().sort({ createdAt: -1 })
        .then((result) => {
            const context = {
                title: 'Games List',
                games: result
            }
            res.render('games-list', context);
        })
        .catch(err => console.log(err));
}

const getAddGame = (req, res) => {
    const context = {
        title: 'Add Game'
    }
    res.render('add-game', context);
}

const postAddGame = (req, res) => {
    const game = new Game(req.body);
    game.save()
        .then(result => res.redirect('/games/list'))
        .catch(err => console.log(err));
}

const getGameDetails = (req, res) => {
    const id = req.params.id;
    Game.findById(id)
        .then((result) => {
            const context = {
                title: 'Game Details',
                game: result
            }
            res.render('game-details', context);
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
                game: result
            }
            res.render('delete-game', context);
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
    getAddGame,
    postAddGame,
    getGameDetails,
    getDeleteGame,
    postDeleteGame
}
