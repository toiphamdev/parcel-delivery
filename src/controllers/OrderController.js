const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
  try {
    const data = await OrderService.createNewOrderService(req.body);
    if (!data) {
      return res.status(200).json({
        errCode: -1,
        errMessage: 'Err from server',
      });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getChartData = async (req, res) => {
  try {
    const data = await OrderService.getChartDataService(req.query);
    if (!data) {
      return res.status(200).json({
        errCode: -1,
        errMessage: 'Err from server',
      });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  getChartData,
};
