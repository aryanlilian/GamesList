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

module.exports = {
    getGamesList,
    getAddGame,
    postAddGame
}
