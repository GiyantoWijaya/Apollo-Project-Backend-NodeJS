const router = require('express').Router();
const authenticationController = require('../controllers/authentication.controller');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');

const { verifyJWT } = require('../middlewares/api.middleware');

router.post('/authentication/login', jsonParser, authenticationController.login);
router.post('/authentication/register', jsonParser, authenticationController.register);
router.get('/authentication/verify', jsonParser, verifyJWT, authenticationController.verify);
// authenticationRoutes.post('/register', register);

module.exports = router;
