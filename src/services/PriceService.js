const db = require('../models');
const convertWeight = require('../utils/genarateOTP').covertWeigth;

const getProvinceService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Province.findAll();
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
        let res = await db.District.findAll({
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
        let res = await db.Ward.findAll({
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

const billingService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.toProvinceId ||
        !data.fromProvinceId ||
        !data.commodityValue ||
        !data.weight
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Price.findOne({
          where: {
            fromProvinceId: +data.fromProvinceId,
            toProvinceId: +data.toProvinceId,
          },
        });
        let cod =
          data.cod &&
          (await db.Service.findOne({
            where: {
              keyMap: data.cod,
            },
          }));

        let bth =
          data.bth &&
          (await db.Service.findOne({
            where: {
              keyMap: data.bth,
            },
          }));

        let weight1 = await db.Allcode.findOne({
          where: {
            type: 'WEIGHT1',
          },
        });
        let weight2 = await db.Allcode.findOne({
          where: {
            type: 'WEIGHT2',
          },
        });
        let weight3 = await db.Allcode.findOne({
          where: {
            type: 'WEIGHT3',
          },
        });
        let weight4 = await db.Allcode.findOne({
          where: {
            type: 'WEIGHT4',
          },
        });

        let weight = data.weight
          ? await convertWeight(
              weight1.keyMap,
              weight2.keyMap,
              weight3.keyMap,
              weight4.keyMap,
              +data.weight
            )
          : 0;

        if (res) {
          let priceService =
            (Number(data.collectMoney) *
              Number(cod ? cod.percentagePrice : 0)) /
              100 +
            (Number(data.comodityValue) *
              Number(bth ? bth.percentagePrice : 0)) /
              100;
          console.log(priceService);

          resolve({
            errCode: 0,
            errMessage: 'Price success!',
            priceProvince: Number(res.price),
            priceService: priceService,
            priceWeigth: weight ? weight : 0,
            totalPrice:
              Number(res.price) + priceService + Number(weight ? weight : 0),
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Price failed',
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
  billingService,
};
