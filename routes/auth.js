const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');

router.route('/register')
      .post(authController.registerUser)
      .delete(authController.deleteUser)

router.route('/login')
      .get(authController.loginUser)
      .post(authController.changePassword)

module.exports = router;