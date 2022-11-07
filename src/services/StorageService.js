const db = require('../models');

const getAllStorageService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Storage.findAll();
      if (data) {
        resolve({
          errCode: 0,
          errMessage: 'get storage success!',
          data: data,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: 'Get storage failed!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllStorageService };
