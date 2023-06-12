const express = require('express');
const { gameList, createGame, updateGame } = require('../controllers/game.controller');

const gameRoutes = express.Router();

gameRoutes.get('/game-list', gameList);
gameRoutes.post('/game-list', createGame);
gameRoutes.put('/game-list/:idGame', updateGame);

module.exports = gameRoutes;
