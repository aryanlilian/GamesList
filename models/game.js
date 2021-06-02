const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Game model Schema
const gameSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
