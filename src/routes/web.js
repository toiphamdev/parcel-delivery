const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();
let initWebRoutes = (app) => {
  router.post('/api/create-new-user', userController.createNewUser);
  router.post('/api/login', userController.handleUserLogin);

  router.get('/', (req, res) => {
    res.send('Toouir gì làm khó a!');
  });

  app.use('/', router);
};
module.exports = initWebRoutes;
