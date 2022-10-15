const db = require('../models');

const createNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.senderEmail ||
        !data.fullName ||
        !data.phoneNumber ||
        !data.address ||
        !data.commodities
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let date = new Date().setHours(0, 0, 0, 0);
        let order = await db.Order.create({
          senderId: data.senderEmail,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          date: date,
          orderCode: data.orderCode,
        });
        let commodities = await db.Commodity.bulkCreate(data.commodities);
        if (order && commodities) {
          resolve({
            errCode: 0,
            errMessage: 'Create order success!',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Create order failed!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewOrderService,
};
