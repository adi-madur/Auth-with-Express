const express = require('express');
const authRouter = express.Router();
const { signup, signin, getUser } = require('../controllers/authController.js');
const jwtAuth = require('../middleware/jwtAuth.js');

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user', jwtAuth, getUser);

module.exports = authRouter;