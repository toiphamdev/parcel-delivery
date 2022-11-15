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

const createNewStorageService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.address) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let data = await db.Storage.create({
          name: data.name,
          address: data.address,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllStorageService, createNewStorageService };
