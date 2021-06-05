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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

// Game model
const Game = mongoose.model('game', gameSchema);

module.exports = Game;
