const express = require('express');
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');
const { accessMidleware } = require('../middleware/JWTMidleware');
const allcodeController = require('../controllers/AllcodeController');
const storageController = require('../controllers/StorageController');
const detailStatusController = require('../controllers/DetailStausController');
const priceController = require('../controllers/PriceController');

const router = express.Router();
let initWebRoutes = (app) => {
  router.post('/api/create-new-user', userController.createNewUser);
  router.post('/api/login', userController.handleUserLogin);
  router.post('/api/logout', userController.handleUserLogout);
  router.post('/api/update-user-info', userController.updateUserInfo);
  router.get('/api/get-user-by-role', userController.getUserByRoleId);

  router.get('/api/get-user-by-email', userController.getUserById);

  router.post('/api/send-otp', userController.sendMailOTP);
  router.post('/api/login-with-otp', userController.loginWithOTP);
  router.post('/api/change-role-user', userController.changeRoleUser);
  // order
  router.post('/api/create-order', orderController.createOrder);
  router.get('/api/get-chart-data', orderController.getChartData);
  router.get('/api/get-order-by-status', orderController.getOrderByStatusId);
  router.get('/api/get-order-storage', orderController.getOrderByStatus);
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
  router.get(
    '/api/search-order-by-postman',
    orderController.searchOrderByPostman
  );

  router.post('/api/bulk-create-order', orderController.bulkCreateOrder);
  router.get('/api/get-commodity', orderController.getCommodity);

  router.get(
    '/api/search-order-by-storage',
    orderController.searchOrderByStorage
  );
  router.get('/api/get-chart-data-admin', orderController.getChartDataAdmin);

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
  //price
  router.get('/api/get-province', priceController.getProvince);
  router.get('/api/get-district', priceController.getDistrict);
  router.get('/api/get-ward', priceController.getWard);
  router.post('/api/billing', priceController.billing);

  app.use('/', router);
};
module.exports = initWebRoutes;
