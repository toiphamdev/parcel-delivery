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

const getOrderByStatusId = async (req, res) => {
  try {
    const data = await OrderService.getOrderByStatusIdService(req.query);
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

const getOrderByStatus = async (req, res) => {
  try {
    const data = await OrderService.getOrderByStatusService(req.query);
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

const updateOrderStatus = async (req, res) => {
  try {
    const data = await OrderService.updateOrderStatusService(req.body);
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

const getOrderPostmanByStatusId = async (req, res) => {
  try {
    const data = await OrderService.getOrderPostmanByStatusIdService(req.query);
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

const orderStorageTranfer = async (req, res) => {
  try {
    const data = await OrderService.orderStorageTranferService(req.body);
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

const getOrderByStorageId = async (req, res) => {
  try {
    const data = await OrderService.getOrderByStorageIdService(req.query);
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

const searchOrderByPostman = async (req, res) => {
  try {
    const data = await OrderService.searchOrderByPostmanService(req.query);
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

const searchOrderByStorage = async (req, res) => {
  try {
    const data = await OrderService.searchOrderByStorageService(req.query);
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

const bulkCreateOrder = async (req, res) => {
  try {
    const data = await OrderService.bulkCreateOrderService(req.body);
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

const getChartDataAdmin = async (req, res) => {
  try {
    const data = await OrderService.getChartDataAdminService(req.query);
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

const getCommodity = async (req, res) => {
  try {
    const data = await OrderService.getCommodityService(req.query);
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
  getOrderByStatusId,
  getOrderByStatus,
  updateOrderStatus,
  getOrderPostmanByStatusId,
  orderStorageTranfer,
  getOrderByStorageId,
  searchOrderByPostman,
  searchOrderByStorage,
  bulkCreateOrder,
  getCommodity,
  getChartDataAdmin,
};
