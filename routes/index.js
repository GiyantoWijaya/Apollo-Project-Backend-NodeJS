const router = require('express').Router();
require('express-group-routes');
const gameRoutes = require('./game.router');
const gameHistoryRoutes = require('./userGameHistory.router');
const authenticationRoutes = require('./authentication.router');
const userProfileRoutes = require('./userProfile.router');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.use('/api', jsonParser, gameRoutes);
router.use('/api', jsonParser, gameHistoryRoutes);
router.use('/api', jsonParser, userProfileRoutes);
router.use('/api', jsonParser, authenticationRoutes);

module.exports = router;
