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
        let transporting = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'TRANSPORT',
            date: data.date,
          },
        });

        let delivery = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'DELIVERY',
            date: data.date,
          },
        });

        let wait = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'WAIT',
            date: data.date,
          },
        });

        let furtherTransfer = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'FURTHER_TRANSFER',
            date: data.date,
          },
        });

        let continu = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'CONTINUE',
            date: data.date,
          },
        });

        let create = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'CREATE',
            date: data.date,
          },
        });

        let storage = await db.DetailStatus.findAll({
          where: {
            verifierEmail: data.verifierEmail,
            statusId: 'CREATE',
            date: data.date,
          },
        });

        resolve({
          transporting: {
            length: transporting.length,
            collectMoney: transporting.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: transporting.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          delivery: {
            length: delivery.length,
            collectMoney: delivery.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: delivery.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          continu: {
            length: continu.length,
            collectMoney: continu.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: continu.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          wait: {
            length: wait.length,
            collectMoney: wait.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: wait.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          furtherTransfer: {
            length: furtherTransfer.length,
            collectMoney: furtherTransfer.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: furtherTransfer.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          storage: {
            length: storage.length,
            collectMoney: storage.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: storage.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          create: {
            length: create.length,
            collectMoney: create.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: create.reduce((total, currentItem) => {
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
