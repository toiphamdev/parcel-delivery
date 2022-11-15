const storageService = require('../services/StorageService');
const getAllStorages = async (req, res) => {
  try {
    const data = await storageService.getAllStorageService();
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

const createNewStorage = async (req, res) => {
  try {
    const data = await storageService.createNewStorageService(req.body);
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

module.exports = { getAllStorages, createNewStorage };
