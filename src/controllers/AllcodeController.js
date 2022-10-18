const allcodeService = require('../services/AllcodeService');

const getAllcode = async (req, res) => {
  try {
    let data = await allcodeService.getAllcodeService(req.query.type);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllcode,
};
