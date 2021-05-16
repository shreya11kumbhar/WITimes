const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/login1", authController.login1);

router.post("/register1", authController.register1);


module.exports= router;