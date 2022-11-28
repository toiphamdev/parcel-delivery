const priceService = require('../services/PriceService');

const getProvince = async (req, res) => {
  try {
    const data = await priceService.getProvinceService();
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

const getDistrict = async (req, res) => {
  try {
    const data = await priceService.getDistrictService(req.query);
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

const getWard = async (req, res) => {
  try {
    const data = await priceService.getWardService(req.query);
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

const billing = async (req, res) => {
  try {
    const data = await priceService.billingService(req.body);
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
  getDistrict,
  getProvince,
  getWard,
  billing,
};
