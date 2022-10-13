const db = require('../models');

const createNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.senderEmail ||
        !data.fullName ||
        !data.phoneNumber ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let order = await db.Order.create({
          senderId: data.senderEmail,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
        if (order) {
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
