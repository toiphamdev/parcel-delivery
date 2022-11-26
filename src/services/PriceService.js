const db = require('../models');

const getProvinceService = () => {
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

const getDistrictService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.provinceId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let res = db.District.findAll({
          where: {
            provinceId: data.provinceId,
          },
        });
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
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getWardService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.districtId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let res = db.District.findAll({
          where: {
            districtId: data.districtId,
          },
        });
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
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getProvinceService,
  getDistrictService,
  getWardService,
};
