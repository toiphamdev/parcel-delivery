const express = require('express');
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const { accessMidleware } = require('../middleware/JWTMidleware');
const allcodeController = require('../controllers/AllcodeController');
const storageController = require('../controllers/StorageController');
const detailStatusController = require('../controllers/DetailStausController');

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
  router.get('/api/get-user-by-role', userController.getUserByRoleId);

  router.get('/api/get-user-by-id', userController.getUserById);

  router.post('/api/send-otp', userController.sendMailOTP);
  router.post('/api/login-with-otp', userController.loginWithOTP);
  // order
  router.post('/api/create-order', orderController.createOrder);
  router.get('/api/get-chart-data', orderController.getChartData);
  router.get('/api/get-order-by-status', orderController.getOrderByStatusId);
  router.get('/api/get-order', orderController.getOrderByStatus);
  router.get(
    '/api/get-order-postman',
    orderController.getOrderPostmanByStatusId
  );
  router.post('/api/update-order-status', orderController.updateOrderStatus);
  router.post(
    '/api/order-storage-transfer',
    orderController.orderStorageTranfer
  );
  router.get('/api/get-order-by-storage', orderController.getOrderByStorageId);

  //allcode
  router.get('/api/get-allcode', allcodeController.getAllcode);
  router.get('/', (req, res) => {
    res.send('a!');
  });

  //storage
  router.get('/api/get-all-storage', storageController.getAllStorages);
  router.get('/api/get-detail-storage', storageController.getDetailStorage);

  //detail status
  router.get(
    '/api/get-chart-data-postman',
    detailStatusController.getChartDataPostman
  );

  app.use('/', router);
};
module.exports = initWebRoutes;
