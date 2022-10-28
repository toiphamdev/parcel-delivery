const { size } = require('lodash');
const db = require('../models');
const { parseCommodityArr } = require('../utils/parseCommodityArr');

const createNewOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
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
        let date = new Date().setHours(0, 0, 0, 0) / 1000;
        let isExist = await db.Order.findOne({
          where: {
            orderCode: data.orderCode,
            senderEmail: data.senderEmail,
          },
        });
        if (isExist) {
          resolve({
            errCode: 3,
            errMessage: 'Order code is exist',
          });
        } else {
          let order = await db.Order.create({
            senderEmail: data.senderEmail,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            date: date,
            orderCode: data.orderCode,
            statusId: 'CREATE',
          });
          let commodityArr = parseCommodityArr(
            data.commodities,
            data.orderCode,
            data.senderEmail
          );
          let commodities = await db.Commodity.bulkCreate(commodityArr);
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
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getChartDataService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.senderEmail) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let transporting = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'TRANSPORT',
          },
        });
        let handling = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'HANDLING',
          },
        });

        let delivery = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'DELIVERY',
          },
        });
        let successDelivery = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'SUCCESSFUL_DELIVERY',
          },
        });

        let wait = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'WAIT',
          },
        });

        let furtherTransfer = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'FURTHER_TRANSFER',
          },
        });

        let refundApproved = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'REFUND_APPROVED',
          },
        });

        let continu = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'CONTINUE',
          },
        });

        let create = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'CREATE',
          },
        });

        let took = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'TOOK',
          },
        });
        let cancelled = await db.Order.findAll({
          where: {
            senderEmail: data.senderEmail,
            statusId: 'CANCELLED',
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
          handling: {
            length: handling.length,
            collectMoney: handling.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: handling.reduce((total, currentItem) => {
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
          cancelled: {
            length: cancelled.length,
            collectMoney: cancelled.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: cancelled.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          took: {
            length: took.length,
            collectMoney: took.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: took.reduce((total, currentItem) => {
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
          continu: {
            length: continu.length,
            collectMoney: continu.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: continu.reduce((total, currentItem) => {
              return total + Number(currentItem.price);
            }, 0),
          },
          successDelivery: {
            length: successDelivery.length,
            collectMoney: successDelivery.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: successDelivery.reduce((total, currentItem) => {
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
          refundApproved: {
            length: refundApproved.length,
            collectMoney: refundApproved.reduce((total, currentItem) => {
              return total + Number(currentItem.collectMoney);
            }, 0),
            price: refundApproved.reduce((total, currentItem) => {
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

const getOrderByStatusIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.page || !data.size || !data.date) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        switch (data.type) {
          case 'SENDER':
            if ((!data.statusId, !data.email, !data.date)) {
              resolve({
                errCode: 1,
                errMessage: 'Missing required parameters!',
              });
            } else {
              let order = await db.Order.findAll({
                where: {
                  senderEmail: data.email,
                  date: data.date,
                  statusId: data.statusId,
                },
                limit: data.size,
                offset: (data.page - 1) * data.size,
                nest: true,
                raw: false,
              });
              if (order) {
                resolve({
                  errCode: 0,
                  errMessage: 'success',
                  data: order,
                });
              } else {
                resolve({
                  errCode: 2,
                  errMessage: 'failed',
                });
              }
            }
            break;
          case 'RECEIVER':
            if ((!data.statusId, !data.email, !data.date)) {
              resolve({
                errCode: 1,
                errMessage: 'Missing required parameters!',
              });
            } else {
              let order = await db.Order.findAll({
                where: {
                  receiverEmail: data.email,
                  date: data.date,
                  statusId: data.statusId,
                },
                limit: data.size,
                offset: (data.page - 1) * data.size,
                nest: true,
                raw: false,
              });
              if (order) {
                resolve({
                  errCode: 0,
                  errMessage: 'success',
                  data: order,
                });
              } else {
                resolve({
                  errCode: 2,
                  errMessage: 'failed',
                });
              }
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewOrderService,
  getChartDataService,
  getOrderByStatusIdService,
};
