const express = require('express');
const authRouter = express.Router();
const { signup } = require('../controllers/authController.js')

authRouter.post('/signup', signup);

module.exports = authRouter;