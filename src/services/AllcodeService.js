const db = require('../models');

const getAllcodeService = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let res = await db.Allcode.findAll({
          where: {
            type: type,
          },
        });
        resolve({
          errCode: 0,
          errMessage: 'get allcode success!',
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllcodeService,
};
