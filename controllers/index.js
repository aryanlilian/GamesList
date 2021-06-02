const Game = require('../models/game');

const getIndex = (req, res) => {
    const context = {
        title: 'Home'
    }
    res.render('index', context);
}

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

module.exports = {
    getIndex,
    getGamesList
}
