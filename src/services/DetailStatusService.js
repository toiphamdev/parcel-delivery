const db = require('../models');

const getChartDataPostmanService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.verifierEmail && !data.date) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let took = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'TOOK',
            date: data.date,
          },
        });

        let successfullDelivery = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'SUCCESSFUL_DELIVERY',
            date: data.date,
          },
        });

        resolve({
          took: {
            length: took.length,
            collectMoney: took.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: took.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          successfullDelivery: {
            length: successfullDelivery.length,
            collectMoney: successfullDelivery.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: successfullDelivery.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getChartDataPostmanService };
