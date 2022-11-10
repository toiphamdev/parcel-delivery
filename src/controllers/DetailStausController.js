const detailDtatusService = require('../services/DetailStatusService');

const getChartDataPostman = async (req, res) => {
  try {
    const data = await detailDtatusService.getChartDataPostmanService(
      req.query
    );
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
  getChartDataPostman,
};
