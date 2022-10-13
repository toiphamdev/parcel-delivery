const express = require('express');
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const { accessMidleware } = require('../middleware/JWTMidleware');

const router = express.Router();
let initWebRoutes = (app) => {
  router.post('/api/create-new-user', userController.createNewUser);
  router.post('/api/login', userController.handleUserLogin);
  router.post('/api/logout', userController.handleUserLogout);
  router.post(
    '/api/update-user-info',
    accessMidleware,
    userController.updateUserInfo
  );

  router.post('/api/send-otp', userController.sendMailOTP);
  router.post('/api/login-with-otp', userController.loginWithOTP);
  // order
  router.post('/api/create-order', orderController.createOrder);

  router.get('/', (req, res) => {
    res.send('Toouir gì làm khó a!');
  });

  app.use('/', router);
};
module.exports = initWebRoutes;
