const db = require('../models');

const getProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = db.Province.findAll();
      if (res) {
        resolve({
          errCode: 0,
          errMessage: 'get province success!',
          data: res,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: 'get province failed',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
